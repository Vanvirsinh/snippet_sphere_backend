const UserProfile = require('../../models/profile/profile');
const { body, validationResult } = require('express-validator');
const { getDate } = require('../../utils/date');

const validateAddProfile = [
    body('headline').isLength({ max: 200 }).withMessage('Headline should not be more than 200 characters!'),
    body('personalEmail').isLength({ max: 50 }).withMessage('Headline should not be more than 50 characters!'),
    body('websiteUrl').isLength({ max: 50 }).withMessage('Headline should not be more than 50 characters!'),
    body('GitHubProfile').isLength({ max: 50 }).withMessage('Headline should not be more than 50 characters!')
]

const addProfile = async (req, res) => {
    try {
        // Validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        const user = req.user;

        // Check whether profile already created
        const profile = await UserProfile.findOne({ userId: user.id });
        const { userImage, headline, personalEmail, websiteUrl, GitHubProfile } = req.body;

        // Create new profile if doesn't exist
        if (!profile) {
            const newUserProfile = new UserProfile({
                userId: user.id,
                userImage,
                headline,
                personalEmail,
                websiteUrl,
                GitHubProfile,
                updatedAt: getDate()
            });

            await newUserProfile.save()
            try {
                return res.status(201).send({ success: true, message: 'Profile Saved Successfully!' })
            } catch {
                return res.status(400).send({ success: false, message: 'Error occured while saving profile!' })
            }
        }

        // Update the profile
        await UserProfile.updateOne({ userId: user.id }, { $set: { userImage, headline, personalEmail, websiteUrl, GitHubProfile, updatedAt: getDate() } });
        try {
            return res.status(201).send({ success: true, message: 'Profile Updated Successfully!' })
        } catch {
            return res.status(400).send({ success: false, message: 'Error occured while updating profile!' })
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { addProfile, validateAddProfile }