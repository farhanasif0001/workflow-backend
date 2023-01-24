const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtconfig = require("../config/jwt");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (typeof email !== "string") {
			throw "Invalid Email Format.";
		}

		const user = await models.users.findOne({
			where: { email },
            include: {
                model: models.roles,
                as: "role"
            }
		});

		if (user) {
            const passwordmatched = await bcrypt.compare(password, user.password);
            if (passwordmatched) {
                let token = jwt.sign(
                    {
                        email: user.email,
                        roleId: user.roleId
                    },
                    jwtconfig.secret,
                    {
                        expiresIn: jwtconfig.expiresIn,
                        notBefore: jwtconfig.notBefore,
                        algorithm: jwtconfig.algorithm,
                    }
                );
                delete user.dataValues.password
                delete user.dataValues.roleId
                res.status(200).json({
                    message: "SUCCESS: User Logged In.",
                    user,
                    token
                });
            }
            else {
                throw "Invalid Password";
            }
		}
        else {
            throw "Invalid Email";
        }
	} catch (error) {
		res.status(500).json({ error });
	}
}

const validateAdmin = (req, res, next) => {
	try {
		let token = req.headers["token"];

		if (token) {
			jwt.verify(token, jwtconfig.secret, (error, data) => {
				if (error) {
					throw "ERROR: Invalid Auth Token.";
				} else {
                    console.log(data)
					if(data.roleId === 1) {
                        next();
                    }
                    else {
                        throw "ERROR: Unauthorized Role."
                    }
				}
			});
		} else {
			throw "ERROR: 'auth-token' missing from request header.";
		}
	} catch (error) {
		return res.status(401).json({
			error
		});
	}
};

const currentUser = async (req, res, next) => {
	try {
		let tokenData = req.tokenData;

		let user = await models.users.scope('withoutPassword').findOne({
            where: {
                email: tokenData.email
            },
            include: {
                model: models.roles,
                as: "role"
            }
        })

        res.status(200).json({
            message: "SUCCESS: User data fetched.",
            user,
            token: req.token
        });

	} catch (error) {
		return res.status(401).json({
			error
		});
	}
};

const validate = (req, res, next) => {
	try {
		let token = req.headers["token"];

		if (token) {
			jwt.verify(token, jwtconfig.secret, (error, data) => {
				if (error) {
					throw "ERROR: Invalid Auth Token.";
				} else {
                    console.log(data);
					req.tokenData = data;
					next();
				}
			});
		} else {
			throw "ERROR: 'auth-token' missing from request header.";
		}
	} catch (error) {
		return res.status(401).json({
			error
		});
	}
};

const register = async (req, res) => {
    try {
        let user = req.body;
        await bcrypt
            .hash(user.password, Number(process.env.PASSWORD_SALTROUNDS))
            .then((hash) => {
                //assigning hashed password back to origin.
                user.password = hash;
                models.users.create(user)
                    .then((user) => {
                        res.status(201).json({
                            user
                        });
                    })
                    .catch((error) => {
                        throw error
                    });
            })
            .catch((error) => {
                throw error
            });
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
}

module.exports = {
    login,
    currentUser,
    validateAdmin,
    validate,
    register
}