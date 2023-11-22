const {default: axios} = require("axios");
const CHAT_ENGINE_PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;
const {comparePassword} = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt");
const {User, Group, UserGroup} = require("../models");
class Controller {
	static async registerToPostgresAndCE(req, res, next) {
		try {
			const {username: u, password: p} = req.body; //dapat dari UI kita

			//register ke Postgres
			const newUser = {
				username: u,
				secret: p,
				firstTime: "true",
			};
			if (p.length < 5) {
				throw new Error("Password must be at least 5 characters long");
			}
			const response = await User.create(newUser);

			//register ke CE
			const data = await axios.post(
				`https://api.chatengine.io/users/`,
				{username: u, secret: p},
				{headers: {"private-key": CHAT_ENGINE_PRIVATE_KEY}}
			);

			//res.status(data.status).json(data);

			res
				.status(201)
				.json({message: `User id ${response.id} successfully created!`});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async loginToPostgres(req, res, next) {
		try {
			const {username: u, password: p} = req.body; //dapat dari UI kita

			if (!u) {
				throw new Error("Username is required");
			}

			if (!p) {
				throw new Error("Password is required");
			}

			const user = await User.findOne({
				where: {username: u},
			});

			if (!user) {
				throw new Error("Invalid username/password");
			}

			if (!comparePassword(p, user.secret)) {
				throw new Error("Invalid username/password");
			}

			const payload = {
				id: user.id,
				username: user.username,
			};
			const token = signToken(payload);

			//firstTime or not?
			const firstTimeOrNot = await User.findOne({
				where: {username: user.username},
			});

			res.status(200).json({
				access_token: token,
				username: user.username,
				firstTime: firstTimeOrNot.firstTime,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateFirstTimeColumnPostgres(req, res, next) {
		try {
			const {id, username} = req.loginInfo;
			await User.update(
				{firstTime: "false"},
				{
					where: {id},
				}
			);
			res.status(200).json({
				message: `User id ${id} firstTime column successfully updated!`,
			});
		} catch (error) {
			next(error);
		}
	}

	static async loginToCE(req, res, next) {
		try {
			const {id, username} = req.loginInfo;

			res.status(200).json({
				PROJECT_ID: "ce7d3869-0c1b-4129-9299-5428dc2cd481",
				USER_NAME: username,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addGroupToUser(req, res, next) {
		try {
			console.log(req.body);
			const group = req.body;
			// console.log(group);
			// console.log(req.params);
			// const group = ["214844", "214845", "214848"];
			const array = Array.from(group);

			const UserId = req.loginInfo.id;
			for (const el of array) {
				const r2 = await axios.post(
					`https://api.chatengine.io/chats/${el.id}/people/`,
					{username: req.loginInfo.username},
					{
						headers: {
							"Project-ID": "ce7d3869-0c1b-4129-9299-5428dc2cd481",
							"User-Name": "cecep",
							"User-Secret": "cecep",
						},
					}
				);
			}

			for (const el of array) {
				const groups = await Group.findAll();

				console.log(Array.isArray(groups));
				const findOne = groups.find((group) => group.title == el.title);
				console.log(findOne);
				const response = await UserGroup.create({UserId, GroupId: findOne.id});
				console.log(response);
			}
			res.status(201).json({message: "success"});

			// console.log(r2);
		} catch (error) {
			next(error);
			console.log(error);
		}
	}

	//? bingung
	// static async showGroupOfUser(req, res, next) {
	//   try {
	//   } catch (error) {
	//     next(error);
	//   }
	// }

	static async deleteGroupOfUser(req, res, next) {
		try {
			const {id} = req.params;
			console.log(req.loginInfo, ">>>>>>>>>>>>");
			const r = await axios.put(
				`https://api.chatengine.io/chats/${id}/people/`,
				{username: req.loginInfo.username},
				{
					headers: {
						"Project-ID": "ce7d3869-0c1b-4129-9299-5428dc2cd481",
						"User-Name": "cecep",
						"User-Secret": "cecep",
					},
				}
			);
			res.status(r.status).json(r.data);
		} catch (error) {
			next(error);
			console.log(error);
		}
	}
}

module.exports = Controller;
