import jwtDecode from 'jwt-decode';

export function parseToken () {
    const decoded = jwtDecode(localStorage.getItem('token'));
    let data = {};

    data["roleId"] = Number(decoded.roleId);
    data["id"] = decoded._id;
    
    if (decoded.roleId === "3") {
        data["firstName"] = decoded.firstName;
        data["id"] = decoded.EngineerId;
    }

    return data;
};