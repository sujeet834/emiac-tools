export const protect = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    next();
};

export const adminOnly = (req, res, next) => {
    if (req.session.role !== 1) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
};
