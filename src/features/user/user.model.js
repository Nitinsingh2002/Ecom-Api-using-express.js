export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name
        this.email = email
        this.password = password
        this.type = type
        this.id = id
    }

    static signUp(name, email, password, type) {
        const newuser = new UserModel(
            name,
            email,
            password,
            type
        )
        newuser.id = users.length + 1,
            users.push(newuser);
        return newuser;
    }


    static logIn(email, password) {
        const user = users.find((u) => {
            return u.email === email && u.password === password;
        });
        return user;
    }

    static getAll() {
        return users
    }
}

var users = [
    {
        id: 1,
        name: 'seller user',
        email: 'user@gmail.com',
        password: 'userpassword',
        type: 'seller'

    }
]