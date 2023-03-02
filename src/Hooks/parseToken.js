import jwtDecode from 'jwt-decode';

export function parseToken () {
    const decoded = jwtDecode(localStorage.getItem('token'));
    let data = {};

    data["roleId"] = Number(decoded.roleId);
    data["id"] = decoded.id;

    return data;
};