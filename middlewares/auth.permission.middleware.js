exports.minimumPermissionLevelRequired = (required_permission_level) => (req, res, next) => {
    let user_permission_level = parseInt(req.user.permissionLevel);
    if (user_permission_level & required_permission_level) {
        next();
    } else {
        return res.status(403).send({ error: "Higher permission level required." });
    }
}