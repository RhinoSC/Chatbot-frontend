import { getInstance } from './index';

const roles = ["Admin"]
export const authorizationGuard = (to, from, next) => {
    const authService = getInstance();
    if (authService.user['sre9/roles'].length === 0) return '/'

    
    const multipleExist = authService.user['sre9/roles'].every(value => {
        return roles.includes(value);
    });

    // If the user is authorized, continue with the route
    if (multipleExist) {
        return next();
    }

    // Otherwise, home
    return '/'
};