/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/LoginController.js":
/*!************************************!*\
  !*** ./src/api/LoginController.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_MailConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/MailConfig */ \"./src/config/MailConfig.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ \"./src/config/index.js\");\n/* harmony import */ var _model_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/user */ \"./src/model/user.js\");\n/* harmony import */ var _common_Utlis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Utlis */ \"./src/common/Utlis.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nclass LoginController {\n  constructor() {}\n\n  async forget(ctx) {\n    const body = ctx.request.body;\n    console.log('body: ', body);\n\n    try {\n      let result = await Object(_config_MailConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        code: '1234',\n        expire: moment__WEBPACK_IMPORTED_MODULE_1___default()().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),\n        email: body.username,\n        user: 'Jolly'\n      });\n      ctx.body = {\n        code: 200,\n        data: result,\n        msg: '邮件发送成功'\n      };\n    } catch (e) {\n      console.log(e);\n    }\n  }\n\n  async login(ctx) {\n    // 接受用户数据\n    let body = ctx.request.body,\n        sid = body.sid,\n        code = body.code; // 验证图片验证码的时效、正确性\n\n    let result = await Object(_common_Utlis__WEBPACK_IMPORTED_MODULE_5__[\"checkCode\"])(sid, code);\n\n    if (result) {\n      // 验证用户账号密码是否正确\n      let checkUserPassword = false;\n      let user = await _model_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n        username: body.username\n      }); // mongoDB查库\n\n      if (user && bcrypt__WEBPACK_IMPORTED_MODULE_6___default.a.compare(body.password, user.password)) {\n        checkUserPassword = true;\n      }\n\n      if (checkUserPassword) {\n        console.log('Hello Login'); // 验证成功返回token\n\n        let token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({\n          _id: 'jolly'\n        }, _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].JWT_SECRET, {\n          expiresIn: '1d'\n        });\n        ctx.body = {\n          code: 200,\n          token\n        };\n      } else {\n        //用户名、密码验证失败，返回提示\n        ctx.body = {\n          code: 404,\n          msg: '用户名或密码错误'\n        };\n      }\n    } else {\n      // 图片验证码验证失败\n      ctx.body = {\n        code: 401,\n        msg: '图片验证码不正确，请检查！'\n      };\n    }\n  }\n\n  async reg(ctx) {\n    // 接受客户端数据\n    const {\n      body\n    } = ctx.request;\n    let sid = body.sid;\n    let code = body.code;\n    let msg = {}; // 验证图片验证码的时效性、正确性\n\n    let result = await Object(_common_Utlis__WEBPACK_IMPORTED_MODULE_5__[\"checkCode\"])(sid, code);\n    let check = true;\n\n    if (result) {\n      // username 是否被注册\n      let user1 = await _model_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n        username: body.username\n      });\n\n      if (user1 && user1.username) {\n        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']; // validation 的报错方式\n\n        check = false;\n      } // name 是否被注册\n\n\n      let user2 = await _model_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n        name: body.name\n      });\n\n      if (user2 && user1.name) {\n        msg.name = ['此昵称已经被注册，请修改'];\n        check = false;\n      } // 未被使用，写入数据库\n\n\n      if (check) {\n        body.password = await bcrypt__WEBPACK_IMPORTED_MODULE_6___default.a.hash(body.password, 5); // 盐\n\n        let user = new _model_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n          username: body.username,\n          name: body.name,\n          password: body.password,\n          created: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD HH:mm:ss')\n        });\n        let result = await user.save();\n        ctx.body = {\n          code: 200,\n          data: result,\n          msg: '注册成功'\n        };\n        return;\n      }\n    } else {\n      msg.code = ['验证码已经失效，请重新获取！'];\n    }\n\n    ctx.body = {\n      code: 500,\n      msg: msg\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new LoginController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0xvZ2luQ29udHJvbGxlci5qcz85NTA3Il0sIm5hbWVzIjpbIkxvZ2luQ29udHJvbGxlciIsImNvbnN0cnVjdG9yIiwiZm9yZ2V0IiwiY3R4IiwiYm9keSIsInJlcXVlc3QiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0Iiwic2VuZCIsImNvZGUiLCJleHBpcmUiLCJtb21lbnQiLCJhZGQiLCJmb3JtYXQiLCJlbWFpbCIsInVzZXJuYW1lIiwidXNlciIsImRhdGEiLCJtc2ciLCJlIiwibG9naW4iLCJzaWQiLCJjaGVja0NvZGUiLCJjaGVja1VzZXJQYXNzd29yZCIsIlVzZXIiLCJmaW5kT25lIiwiYmNyeXB0IiwiY29tcGFyZSIsInBhc3N3b3JkIiwidG9rZW4iLCJqc29ud2VidG9rZW4iLCJzaWduIiwiX2lkIiwiY29uZmlnIiwiSldUX1NFQ1JFVCIsImV4cGlyZXNJbiIsInJlZyIsImNoZWNrIiwidXNlcjEiLCJ1c2VyMiIsIm5hbWUiLCJoYXNoIiwiY3JlYXRlZCIsInNhdmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxlQUFOLENBQXNCO0FBQ3BCQyxhQUFXLEdBQUUsQ0FBRTs7QUFFZixRQUFNQyxNQUFOLENBQWNDLEdBQWQsRUFBbUI7QUFDakIsVUFBTUMsSUFBSSxHQUFHRCxHQUFHLENBQUNFLE9BQUosQ0FBWUQsSUFBekI7QUFDQUUsV0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUFzQkgsSUFBdEI7O0FBQ0EsUUFBSTtBQUNGLFVBQUlJLE1BQU0sR0FBRyxNQUFNQyxrRUFBSSxDQUFDO0FBQ3RCQyxZQUFJLEVBQUUsTUFEZ0I7QUFFdEJDLGNBQU0sRUFBRUMsNkNBQU0sR0FBR0MsR0FBVCxDQUFhLEVBQWIsRUFBaUIsU0FBakIsRUFBNEJDLE1B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QVg7QUFJRDs7QUFwSG1COztBQXVIUCxtRUFBSW5CLGVBQUosRUFBZiIsImZpbGUiOiIuL3NyYy9hcGkvTG9naW5Db250cm9sbGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlbmQgZnJvbSAnLi4vY29uZmlnL01haWxDb25maWcnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBqc29ud2VidG9rZW4gZnJvbSAnanNvbndlYnRva2VuJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgVXNlciBmcm9tICcuLi9tb2RlbC91c2VyJ1xuaW1wb3J0IHsgY2hlY2tDb2RlIH0gZnJvbSAnLi4vY29tbW9uL1V0bGlzJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnXG5cbmNsYXNzIExvZ2luQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCl7fVxuXG4gIGFzeW5jIGZvcmdldCAoY3R4KSB7XG4gICAgY29uc3QgYm9keSA9IGN0eC5yZXF1ZXN0LmJvZHlcbiAgICBjb25zb2xlLmxvZygnYm9keTogJywgYm9keSlcbiAgICB0cnkge1xuICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHNlbmQoe1xuICAgICAgICBjb2RlOiAnMTIzNCcsXG4gICAgICAgIGV4cGlyZTogbW9tZW50KCkuYWRkKDMwLCAnbWludXRlcycpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgICBlbWFpbDogYm9keS51c2VybmFtZSxcbiAgICAgICAgdXNlcjogJ0pvbGx5J1xuICAgICAgfSlcbiAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgbXNnOiAn6YKu5Lu25Y+R6YCB5oiQ5YqfJ1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9naW4gKGN0eCkge1xuXG4gICAgLy8g5o6l5Y+X55So5oi35pWw5o2uXG4gICAgbGV0IGJvZHkgPSBjdHgucmVxdWVzdC5ib2R5LFxuICAgIHNpZCA9IGJvZHkuc2lkLFxuICAgIGNvZGUgPSBib2R5LmNvZGVcbiAgICBcbiAgICAvLyDpqozor4Hlm77niYfpqozor4HnoIHnmoTml7bmlYjjgIHmraPnoa7mgKdcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY2hlY2tDb2RlKHNpZCwgY29kZSk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgXG4gICAgICAvLyDpqozor4HnlKjmiLfotKblj7flr4bnoIHmmK/lkKbmraPnoa5cbiAgICAgIGxldCBjaGVja1VzZXJQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyB1c2VybmFtZTogYm9keS51c2VybmFtZSB9KTsgLy8gbW9uZ29EQuafpeW6k1xuICAgICAgaWYgKHVzZXIgJiYgYmNyeXB0LmNvbXBhcmUoYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCkpIHtcbiAgICAgICAgY2hlY2tVc2VyUGFzc3dvcmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoY2hlY2tVc2VyUGFzc3dvcmQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hlbGxvIExvZ2luJyk7XG5cbiAgICAgICAgLy8g6aqM6K+B5oiQ5Yqf6L+U5ZuedG9rZW5cbiAgICAgICAgbGV0IHRva2VuID0ganNvbndlYnRva2VuLnNpZ24oe19pZDogJ2pvbGx5J30sIGNvbmZpZy5KV1RfU0VDUkVULCB7XG4gICAgICAgICAgZXhwaXJlc0luOiAnMWQnXG4gICAgICAgIH0pO1xuICAgICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgICAgdG9rZW5cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICAvL+eUqOaIt+WQjeOAgeWvhueggemqjOivgeWksei0pe+8jOi/lOWbnuaPkOekulxuICAgICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgICBjb2RlOiA0MDQsXG4gICAgICAgICAgbXNnOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBcbiAgICAgIC8vIOWbvueJh+mqjOivgeeggemqjOivgeWksei0pVxuICAgICAgY3R4LmJvZHkgPSB7XG4gICAgICAgIGNvZGU6IDQwMSxcbiAgICAgICAgbXNnOiAn5Zu+54mH6aqM6K+B56CB5LiN5q2j56Gu77yM6K+35qOA5p+l77yBJ1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgXG4gIGFzeW5jIHJlZyAoY3R4KSB7XG4gICAgLy8g5o6l5Y+X5a6i5oi356uv5pWw5o2uXG4gICAgY29uc3QgeyBib2R5IH0gPSBjdHgucmVxdWVzdFxuICAgIGxldCBzaWQgPSBib2R5LnNpZFxuICAgIGxldCBjb2RlID0gYm9keS5jb2RlXG4gICAgbGV0IG1zZyA9IHt9XG4gICAgLy8g6aqM6K+B5Zu+54mH6aqM6K+B56CB55qE5pe25pWI5oCn44CB5q2j56Gu5oCnXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZShzaWQsIGNvZGUpXG4gICAgbGV0IGNoZWNrID0gdHJ1ZVxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIC8vIHVzZXJuYW1lIOaYr+WQpuiiq+azqOWGjFxuICAgICAgbGV0IHVzZXIxID0gYXdhaXQgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IGJvZHkudXNlcm5hbWUgfSlcbiAgICAgIGlmICh1c2VyMSAmJiB1c2VyMS51c2VybmFtZSkge1xuICAgICAgICBtc2cudXNlcm5hbWUgPSBbJ+atpOmCrueuseW3sue7j+azqOWGjO+8jOWPr+S7pemAmui/h+mCrueuseaJvuWbnuWvhueggSddIC8vIHZhbGlkYXRpb24g55qE5oql6ZSZ5pa55byPXG4gICAgICAgIGNoZWNrID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIC8vIG5hbWUg5piv5ZCm6KKr5rOo5YaMXG4gICAgICBsZXQgdXNlcjIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBuYW1lOiBib2R5Lm5hbWUgfSlcbiAgICAgIGlmICh1c2VyMiAmJiB1c2VyMS5uYW1lKSB7XG4gICAgICAgIG1zZy5uYW1lID0gWyfmraTmmLXnp7Dlt7Lnu4/ooqvms6jlhozvvIzor7fkv67mlLknXVxuICAgICAgICBjaGVjayA9IGZhbHNlXG4gICAgICB9XG4gICAgICAvLyDmnKrooqvkvb/nlKjvvIzlhpnlhaXmlbDmja7lupNcbiAgICAgIGlmIChjaGVjaykge1xuICAgICAgICBib2R5LnBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2goYm9keS5wYXNzd29yZCwgNSkgLy8g55uQXG4gICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIoe1xuICAgICAgICAgIHVzZXJuYW1lOiBib2R5LnVzZXJuYW1lLFxuICAgICAgICAgIG5hbWU6IGJvZHkubmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogYm9keS5wYXNzd29yZCxcbiAgICAgICAgICBjcmVhdGVkOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxuICAgICAgICB9KVxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdXNlci5zYXZlKClcbiAgICAgICAgY3R4LmJvZHkgPSB7XG4gICAgICAgICAgY29kZTogMjAwLFxuICAgICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgICBtc2c6ICfms6jlhozmiJDlip8nXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZy5jb2RlID0gWyfpqozor4HnoIHlt7Lnu4/lpLHmlYjvvIzor7fph43mlrDojrflj5bvvIEnXVxuICAgIH1cbiAgICBjdHguYm9keSA9IHtcbiAgICAgIGNvZGU6IDUwMCxcbiAgICAgIG1zZzogbXNnXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBMb2dpbkNvbnRyb2xsZXIoKSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/api/LoginController.js\n");

/***/ }),

/***/ "./src/api/PublicController.js":
/*!*************************************!*\
  !*** ./src/api/PublicController.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-captcha */ \"svg-captcha\");\n/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_captcha__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/RedisConfig */ \"./src/config/RedisConfig.js\");\n\n\n\nclass PublicController {\n  constructor() {}\n  /**\n   * 生成验证码\n   * @param {Objeck} ctx \n   */\n\n\n  async getCaptcha(ctx) {\n    let body = ctx.request.query;\n    const newCaptcha = svg_captcha__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n      size: 4,\n      // 验证码长度\n      ignoreChars: '0o1il',\n      // 验证码字符中排除\n      color: true,\n      // 验证码的字符是否有颜色\n      noise: Math.floor(Math.random() * 5),\n      // 干扰线条的数量\n      width: 150,\n      height: 38\n    });\n    console.log('newCaptcha: ', newCaptcha);\n    Object(_config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__[\"setValue\"])(body.sid, newCaptcha.text, 10 * 60);\n    ctx.body = {\n      code: 200,\n      data: newCaptcha.data\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new PublicController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1B1YmxpY0NvbnRyb2xsZXIuanM/NjhhZSJdLCJuYW1lcyI6WyJQdWJsaWNDb250cm9sbGVyIiwiY29uc3RydWN0b3IiLCJnZXRDYXB0Y2hhIiwiY3R4IiwiYm9keSIsInJlcXVlc3QiLCJxdWVyeSIsIm5ld0NhcHRjaGEiLCJzdmdDYXB0Y2hhIiwiY3JlYXRlIiwic2l6ZSIsImlnbm9yZUNoYXJzIiwiY29sb3IiLCJub2lzZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiY29uc29sZSIsImxvZyIsInNldFZhbHVlIiwic2lkIiwidGV4dCIsImNvZGUiLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsTUFBTUEsZ0JBQU4sQ0FBdUI7QUFDckJDLGFBQVcsR0FBRyxDQUFFO0FBRWhCOzs7Ozs7QUFJQSxRQUFNQyxVQUFOLENBQWlCQyxHQUFqQixFQUFzQjtBQUNwQixRQUFJQyxJQUFJLEdBQUdELEdBQUcsQ0FBQ0UsT0FBSixDQUFZQyxLQUF2QjtBQUNBLFVBQU1DLFVBQVUsR0FBR0Msa0RBQVUsQ0FBQ0MsTUFBWCxDQUFrQjtBQUNuQ0MsVUFBSSxFQUFFLENBRDZCO0FBQzNCO0FBQ1JDLGlCQUFXLEVBQUUsT0FGc0I7QUFFZDtBQUNyQkMsV0FBSyxFQUFFLElBSDRCO0FBR3ZCO0FBQ1pDLFdBQUssRUFBRUMsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixDQUEzQixDQUo0QjtBQUlFO0FBQ3JDQyxXQUFLLEVBQUUsR0FMNEI7QUFNbkNDLFlBQU0sRUFBRTtBQU4yQixLQUFsQixDQUFuQjtBQVFBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCYixVQUE1QjtBQUNBYyx3RUFBUSxDQUFDakIsSUFBSSxDQUFDa0IsR0FBTixFQUFXZixVQUFVLENBQUNnQixJQUF0QixFQUE0QixLQUFLLEVBQWpDLENBQVI7QUFDQXBCLE9BQUcsQ0FBQ0MsSUFBSixHQUFXO0FBQ1RvQixVQUFJLEVBQUUsR0FERztBQUVUQyxVQUFJLEVBQUVsQixVQUFVLENBQUNrQjtBQUZSLEtBQVg7QUFJRDs7QUF2Qm9COztBQTBCUixtRUFBSXpCLGdCQUFKLEVBQWYiLCJmaWxlIjoiLi9zcmMvYXBpL1B1YmxpY0NvbnRyb2xsZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3ZnQ2FwdGNoYSBmcm9tICdzdmctY2FwdGNoYSdcbmltcG9ydCB7IHNldFZhbHVlIH0gZnJvbSAnLi4vY29uZmlnL1JlZGlzQ29uZmlnJ1xuXG5jbGFzcyBQdWJsaWNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiDnlJ/miJDpqozor4HnoIFcbiAgICogQHBhcmFtIHtPYmplY2t9IGN0eCBcbiAgICovXG4gIGFzeW5jIGdldENhcHRjaGEoY3R4KSB7XG4gICAgbGV0IGJvZHkgPSBjdHgucmVxdWVzdC5xdWVyeVxuICAgIGNvbnN0IG5ld0NhcHRjaGEgPSBzdmdDYXB0Y2hhLmNyZWF0ZSh7XG4gICAgICBzaXplOiA0LC8vIOmqjOivgeeggemVv+W6plxuICAgICAgaWdub3JlQ2hhcnM6ICcwbzFpbCcsLy8g6aqM6K+B56CB5a2X56ym5Lit5o6S6ZmkXG4gICAgICBjb2xvcjogdHJ1ZSwvLyDpqozor4HnoIHnmoTlrZfnrKbmmK/lkKbmnInpopzoibJcbiAgICAgIG5vaXNlOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSwvLyDlubLmibDnur/mnaHnmoTmlbDph49cbiAgICAgIHdpZHRoOiAxNTAsXG4gICAgICBoZWlnaHQ6IDM4XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coJ25ld0NhcHRjaGE6ICcsIG5ld0NhcHRjaGEpO1xuICAgIHNldFZhbHVlKGJvZHkuc2lkLCBuZXdDYXB0Y2hhLnRleHQsIDEwICogNjApXG4gICAgY3R4LmJvZHkgPSB7XG4gICAgICBjb2RlOiAyMDAsXG4gICAgICBkYXRhOiBuZXdDYXB0Y2hhLmRhdGFcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQdWJsaWNDb250cm9sbGVyKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/api/PublicController.js\n");

/***/ }),

/***/ "./src/common/ErrorHandle.js":
/*!***********************************!*\
  !*** ./src/common/ErrorHandle.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((ctx, next) => {\n  return next().catch(err => {\n    if (err.status == 401) {\n      ctx.status = 401;\n      ctx.body = {\n        code: 401,\n        msg: 'Protected resource, use Authorization header to get access\\n'\n      };\n    } else {\n      throw err;\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0Vycm9ySGFuZGxlLmpzPzQxZWIiXSwibmFtZXMiOlsiY3R4IiwibmV4dCIsImNhdGNoIiwiZXJyIiwic3RhdHVzIiwiYm9keSIsImNvZGUiLCJtc2ciXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWUsZ0VBQUNBLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzVCLFNBQU9BLElBQUksR0FBR0MsS0FBUCxDQUFhQyxHQUFHLElBQUk7QUFDekIsUUFBSUEsR0FBRyxDQUFDQyxNQUFKLElBQWMsR0FBbEIsRUFBdUI7QUFDckJKLFNBQUcsQ0FBQ0ksTUFBSixHQUFhLEdBQWI7QUFDQUosU0FBRyxDQUFDSyxJQUFKLEdBQVc7QUFDVEMsWUFBSSxFQUFFLEdBREc7QUFFVEMsV0FBRyxFQUFFO0FBRkksT0FBWDtBQUlELEtBTkQsTUFNTztBQUNMLFlBQU1KLEdBQU47QUFDRDtBQUNGLEdBVk0sQ0FBUDtBQVdELENBWkQiLCJmaWxlIjoiLi9zcmMvY29tbW9uL0Vycm9ySGFuZGxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlVGVzdEFjY291bnQgfSBmcm9tIFwibm9kZW1haWxlclwiXG5cbmV4cG9ydCBkZWZhdWx0IChjdHgsIG5leHQpID0+IHtcbiAgcmV0dXJuIG5leHQoKS5jYXRjaChlcnIgPT4ge1xuICAgIGlmIChlcnIuc3RhdHVzID09IDQwMSkge1xuICAgICAgY3R4LnN0YXR1cyA9IDQwMTtcbiAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICBjb2RlOiA0MDEsXG4gICAgICAgIG1zZzogJ1Byb3RlY3RlZCByZXNvdXJjZSwgdXNlIEF1dGhvcml6YXRpb24gaGVhZGVyIHRvIGdldCBhY2Nlc3NcXG4nXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH0pXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/common/ErrorHandle.js\n");

/***/ }),

/***/ "./src/common/Utlis.js":
/*!*****************************!*\
  !*** ./src/common/Utlis.js ***!
  \*****************************/
/*! exports provided: checkCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkCode\", function() { return checkCode; });\n/* harmony import */ var _config_RedisConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/RedisConfig */ \"./src/config/RedisConfig.js\");\n\n\nlet checkCode = async (key, value) => {\n  const redisData = await Object(_config_RedisConfig__WEBPACK_IMPORTED_MODULE_0__[\"getValue\"])(key);\n\n  if (redisData) {\n    if (redisData.toLowerCase() === value.toLowerCase()) {\n      return true;\n    }\n  }\n\n  return;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL1V0bGlzLmpzP2U5ZGIiXSwibmFtZXMiOlsiY2hlY2tDb2RlIiwia2V5IiwidmFsdWUiLCJyZWRpc0RhdGEiLCJnZXRWYWx1ZSIsInRvTG93ZXJDYXNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQSxJQUFJQSxTQUFTLEdBQUcsT0FBT0MsR0FBUCxFQUFZQyxLQUFaLEtBQXNCO0FBQ3BDLFFBQU1DLFNBQVMsR0FBRyxNQUFNQyxvRUFBUSxDQUFDSCxHQUFELENBQWhDOztBQUNBLE1BQUlFLFNBQUosRUFBZTtBQUNiLFFBQUlBLFNBQVMsQ0FBQ0UsV0FBVixPQUE0QkgsS0FBSyxDQUFDRyxXQUFOLEVBQWhDLEVBQXFEO0FBQ25ELGFBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBQ0Q7QUFDRCxDQVJEIiwiZmlsZSI6Ii4vc3JjL2NvbW1vbi9VdGxpcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFZhbHVlIH0gZnJvbSAnLi4vY29uZmlnL1JlZGlzQ29uZmlnJ1xuXG5sZXQgY2hlY2tDb2RlID0gYXN5bmMgKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgcmVkaXNEYXRhID0gYXdhaXQgZ2V0VmFsdWUoa2V5KVxuICBpZiAocmVkaXNEYXRhKSB7XG4gICAgaWYgKHJlZGlzRGF0YS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm5cbn1cblxuZXhwb3J0IHtcbiAgY2hlY2tDb2RlXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/common/Utlis.js\n");

/***/ }),

/***/ "./src/config/DBhelper.js":
/*!********************************!*\
  !*** ./src/config/DBhelper.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n\n\nconsole.log('config: ', _index__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect(_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DB_URL, {\n  useNewUrlParser: true\n});\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection.on('connected', () => {\n  console.log('Mongoose connection open to ' + _index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DB_URL);\n});\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection.on('error', () => {\n  console.log('Mongoose connection error: ' + err);\n});\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection.on('disconnected', () => {\n  console.log('Mongoose connection disconnected');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL0RCaGVscGVyLmpzP2UwNjUiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImNvbmZpZyIsIm1vbmdvb3NlIiwiY29ubmVjdCIsIkRCX1VSTCIsInVzZU5ld1VybFBhcnNlciIsImNvbm5lY3Rpb24iLCJvbiIsImVyciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JDLDhDQUF4QjtBQUNBQywrQ0FBUSxDQUFDQyxPQUFULENBQWlCRiw4Q0FBTSxDQUFDRyxNQUF4QixFQUFnQztBQUM5QkMsaUJBQWUsRUFBRTtBQURhLENBQWhDO0FBSUFILCtDQUFRLENBQUNJLFVBQVQsQ0FBb0JDLEVBQXBCLENBQXVCLFdBQXZCLEVBQW9DLE1BQU07QUFDeENSLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFpQ0MsOENBQU0sQ0FBQ0csTUFBcEQ7QUFDRCxDQUZEO0FBSUFGLCtDQUFRLENBQUNJLFVBQVQsQ0FBb0JDLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLE1BQU07QUFDcENSLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFnQ1EsR0FBNUM7QUFDRCxDQUZEO0FBSUFOLCtDQUFRLENBQUNJLFVBQVQsQ0FBb0JDLEVBQXBCLENBQXVCLGNBQXZCLEVBQXVDLE1BQU07QUFDM0NSLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0QsQ0FGRDtBQUllRSw4R0FBZiIsImZpbGUiOiIuL3NyYy9jb25maWcvREJoZWxwZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vaW5kZXgnXG5cbmNvbnNvbGUubG9nKCdjb25maWc6ICcsIGNvbmZpZyk7XG5tb25nb29zZS5jb25uZWN0KGNvbmZpZy5EQl9VUkwsIHtcbiAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxufSlcblxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZygnTW9uZ29vc2UgY29ubmVjdGlvbiBvcGVuIHRvICcgKyBjb25maWcuREJfVVJMKVxufSlcblxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdNb25nb29zZSBjb25uZWN0aW9uIGVycm9yOiAnICsgZXJyKTtcbn0pXG5cbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Rpc2Nvbm5lY3RlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ01vbmdvb3NlIGNvbm5lY3Rpb24gZGlzY29ubmVjdGVkJylcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config/DBhelper.js\n");

/***/ }),

/***/ "./src/config/MailConfig.js":
/*!**********************************!*\
  !*** ./src/config/MailConfig.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);\n // 由nodemailer官网例子改造\n\nasync function send(sendInfo) {\n  // 没有真实测试账号时，使用ethereal.email创建一个测试用SMTP协议的邮件服务号\n  // let testAccount = await nodemailer.createTestAccount()\n  // SMTP 邮件发送服务器\n  let transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0___default.a.createTransport({\n    host: 'smtp.qq.com',\n    port: 465,\n    secure: true,\n    // 默认false，使用true则使用tls连接连接到邮件服务，465可以设置为true，587、25保持false就行\n    auth: {\n      user: '860194716@qq.com',\n      pass: 'wyyhklwiyyhsbajc' // qq邮箱生成的授权码。qq邮箱 设置=》账号=》POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务，开启POP3/SMTP服务\n\n    }\n  }); // 以上host port设置，参考 https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=369 中 Foxmail 的设置部分\n\n  let url = 'http://www.imooc.com';\n  let info = transporter.sendMail({\n    from: '\"认证邮件\" <860194716@qq.com>',\n    // sender address\n    to: sendInfo.email,\n    // list of receivers\n    subject: sendInfo.user !== '' ? `你好开发者，${sendInfo.user}！《慕课网前端全栈实践》注册码` : '《慕课网前端全栈实践》注册码',\n    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`,\n    html: `\n        <div style=\"border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;\">\n        <div style=\"height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;\">Imooc社区——欢迎来到官方社区</div>\n        <div style=\"padding: 25px\">\n          <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前重置您的密码：</div>\n          <a href=\"${url}\" style=\"padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;\">立即重置密码</a>\n          <div style=\"padding: 5px; background: #f2f2f2;\">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>\n        </div>\n        <div style=\"background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;\">系统邮件，请勿直接回复</div>\n    </div>\n    `\n  });\n  return 'Message Id: s%', info.messageId;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (send);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL01haWxDb25maWcuanM/MmRiMSJdLCJuYW1lcyI6WyJzZW5kIiwic2VuZEluZm8iLCJ0cmFuc3BvcnRlciIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJob3N0IiwicG9ydCIsInNlY3VyZSIsImF1dGgiLCJ1c2VyIiwicGFzcyIsInVybCIsImluZm8iLCJzZW5kTWFpbCIsImZyb20iLCJ0byIsImVtYWlsIiwic3ViamVjdCIsInRleHQiLCJjb2RlIiwiZXhwaXJlIiwiaHRtbCIsIm1lc3NhZ2VJZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0NBRUE7O0FBQ0EsZUFBZUEsSUFBZixDQUFxQkMsUUFBckIsRUFBK0I7QUFFN0I7QUFDQTtBQUVBO0FBQ0EsTUFBSUMsV0FBVyxHQUFHQyxpREFBVSxDQUFDQyxlQUFYLENBQTJCO0FBQzNDQyxRQUFJLEVBQUUsYUFEcUM7QUFFM0NDLFFBQUksRUFBRSxHQUZxQztBQUczQ0MsVUFBTSxFQUFFLElBSG1DO0FBRzlCO0FBQ2JDLFFBQUksRUFBRTtBQUNKQyxVQUFJLEVBQUUsa0JBREY7QUFFSkMsVUFBSSxFQUFFLGtCQUZGLENBRXFCOztBQUZyQjtBQUpxQyxHQUEzQixDQUFsQixDQU42QixDQWU3Qjs7QUFFQSxNQUFJQyxHQUFHLEdBQUcsc0JBQVY7QUFFQSxNQUFJQyxJQUFJLEdBQUdWLFdBQVcsQ0FBQ1csUUFBWixDQUFxQjtBQUM5QkMsUUFBSSxFQUFFLDJCQUR3QjtBQUNLO0FBQ25DQyxNQUFFLEVBQUVkLFFBQVEsQ0FBQ2UsS0FGaUI7QUFFVjtBQUNwQkMsV0FBTyxFQUFFaEIsUUFBUSxDQUFDUSxJQUFULEtBQWtCLEVBQWxCLEdBQXdCLFNBQVFSLFFBQVEsQ0FBQ1EsSUFBSyxpQkFBOUMsR0FBZ0UsZ0JBSDNDO0FBSTlCUyxRQUFJLEVBQUcsNEJBQTJCakIsUUFBUSxDQUFDa0IsSUFBSyxjQUFhbEIsUUFBUSxDQUFDbUIsTUFBTyxFQUovQztBQUs5QkMsUUFBSSxFQUFHOzs7O29CQUlTcEIsUUFBUSxDQUFDUSxJQUFLLHFCQUM1QlIsUUFBUSxDQUFDbUIsTUFDVjtxQkFDZ0JULEdBQUk7Ozs7OztBQVpTLEdBQXJCLENBQVg7QUFvQkEsU0FBTyxrQkFBa0JDLElBQUksQ0FBQ1UsU0FBOUI7QUFDRDs7QUFFY3RCLG1FQUFmIiwiZmlsZSI6Ii4vc3JjL2NvbmZpZy9NYWlsQ29uZmlnLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInXG5cbi8vIOeUsW5vZGVtYWlsZXLlrpjnvZHkvovlrZDmlLnpgKBcbmFzeW5jIGZ1bmN0aW9uIHNlbmQgKHNlbmRJbmZvKSB7XG5cbiAgLy8g5rKh5pyJ55yf5a6e5rWL6K+V6LSm5Y+35pe277yM5L2/55SoZXRoZXJlYWwuZW1haWzliJvlu7rkuIDkuKrmtYvor5XnlKhTTVRQ5Y2P6K6u55qE6YKu5Lu25pyN5Yqh5Y+3XG4gIC8vIGxldCB0ZXN0QWNjb3VudCA9IGF3YWl0IG5vZGVtYWlsZXIuY3JlYXRlVGVzdEFjY291bnQoKVxuXG4gIC8vIFNNVFAg6YKu5Lu25Y+R6YCB5pyN5Yqh5ZmoXG4gIGxldCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICBob3N0OiAnc210cC5xcS5jb20nLFxuICAgIHBvcnQ6IDQ2NSxcbiAgICBzZWN1cmU6IHRydWUsLy8g6buY6K6kZmFsc2XvvIzkvb/nlKh0cnVl5YiZ5L2/55SodGxz6L+e5o6l6L+e5o6l5Yiw6YKu5Lu25pyN5Yqh77yMNDY15Y+v5Lul6K6+572u5Li6dHJ1Ze+8jDU4N+OAgTI15L+d5oyBZmFsc2XlsLHooYxcbiAgICBhdXRoOiB7XG4gICAgICB1c2VyOiAnODYwMTk0NzE2QHFxLmNvbScsXG4gICAgICBwYXNzOiAnd3l5aGtsd2l5eWhzYmFqYycgLy8gcXHpgq7nrrHnlJ/miJDnmoTmjojmnYPnoIHjgIJxcemCrueusSDorr7nva4944CL6LSm5Y+3PeOAi1BPUDMvSU1BUC9TTVRQL0V4Y2hhbmdlL0NhcmREQVYvQ2FsREFW5pyN5Yqh77yM5byA5ZCvUE9QMy9TTVRQ5pyN5YqhXG4gICAgfVxuICB9KVxuICAvLyDku6XkuIpob3N0IHBvcnTorr7nva7vvIzlj4LogIMgaHR0cHM6Ly9zZXJ2aWNlLm1haWwucXEuY29tL2NnaS1iaW4vaGVscD9zdWJ0eXBlPTEmJmlkPTI4JiZubz0zNjkg5LitIEZveG1haWwg55qE6K6+572u6YOo5YiGXG5cbiAgbGV0IHVybCA9ICdodHRwOi8vd3d3Lmltb29jLmNvbSdcbiAgXG4gIGxldCBpbmZvID0gdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xuICAgIGZyb206ICdcIuiupOivgemCruS7tlwiIDw4NjAxOTQ3MTZAcXEuY29tPicsIC8vIHNlbmRlciBhZGRyZXNzXG4gICAgdG86IHNlbmRJbmZvLmVtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xuICAgIHN1YmplY3Q6IHNlbmRJbmZvLnVzZXIgIT09ICcnID8gYOS9oOWlveW8gOWPkeiAhe+8jCR7c2VuZEluZm8udXNlcn3vvIHjgIrmhZXor77nvZHliY3nq6/lhajmoIjlrp7ot7XjgIvms6jlhoznoIFgOiAn44CK5oWV6K++572R5YmN56uv5YWo5qCI5a6e6Le144CL5rOo5YaM56CBJyxcbiAgICB0ZXh0OiBg5oKo5Zyo44CK5oWV6K++572R5YmN56uv5YWo5qCI5a6e6Le144CL6K++56iL5Lit5rOo5YaM77yM5oKo55qE6YKA6K+356CB5pivJHtzZW5kSW5mby5jb2RlfSzpgoDor7fnoIHnmoTov4fmnJ/ml7bpl7Q6ICR7c2VuZEluZm8uZXhwaXJlfWAsXG4gICAgaHRtbDogYFxuICAgICAgICA8ZGl2IHN0eWxlPVwiYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztjb2xvcjogIzY3Njc2Nzt3aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nLWJvdHRvbTogNTBweDtwb3NpdGlvbjogcmVsYXRpdmU7XCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDYwcHg7IGJhY2tncm91bmQ6ICMzOTNkNDk7IGxpbmUtaGVpZ2h0OiA2MHB4OyBjb2xvcjogIzU4YTM2ZjsgZm9udC1zaXplOiAxOHB4O3BhZGRpbmctbGVmdDogMTBweDtcIj5JbW9vY+ekvuWMuuKAlOKAlOasoui/juadpeWIsOWumOaWueekvuWMujwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMjVweFwiPlxuICAgICAgICAgIDxkaXY+5oKo5aW977yMJHtzZW5kSW5mby51c2Vyfeerpemei++8jOmHjee9rumTvuaOpeacieaViOaXtumXtDMw5YiG6ZKf77yM6K+35ZyoJHtcbiAgICAgIHNlbmRJbmZvLmV4cGlyZVxuICAgIH3kuYvliY3ph43nva7mgqjnmoTlr4bnoIHvvJo8L2Rpdj5cbiAgICAgICAgICA8YSBocmVmPVwiJHt1cmx9XCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4IDIwcHg7IGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiAjMDA5ZTk0OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7bWFyZ2luOiAxNXB4IDA7XCI+56uL5Y2z6YeN572u5a+G56CBPC9hPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiA1cHg7IGJhY2tncm91bmQ6ICNmMmYyZjI7XCI+5aaC5p6c6K+l6YKu5Lu25LiN5piv55Sx5L2g5pys5Lq65pON5L2c77yM6K+35Yu/6L+b6KGM5r+A5rS777yB5ZCm5YiZ5L2g55qE6YKu566x5bCG5Lya6KKr5LuW5Lq657uR5a6a44CCPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2ZhZmFmYTsgY29sb3I6ICNiNGI0YjQ7dGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogNDVweDsgaGVpZ2h0OiA0NXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDA7IGJvdHRvbTogMDt3aWR0aDogMTAwJTtcIj7ns7vnu5/pgq7ku7bvvIzor7fli7/nm7TmjqXlm57lpI08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICB9KVxuXG4gIHJldHVybiAnTWVzc2FnZSBJZDogcyUnLCBpbmZvLm1lc3NhZ2VJZCBcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VuZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config/MailConfig.js\n");

/***/ }),

/***/ "./src/config/RedisConfig.js":
/*!***********************************!*\
  !*** ./src/config/RedisConfig.js ***!
  \***********************************/
/*! exports provided: setValue, getValue, getHValue, delValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setValue\", function() { return setValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getValue\", function() { return getValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getHValue\", function() { return getHValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delValue\", function() { return delValue; });\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redis */ \"redis\");\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bluebird */ \"bluebird\");\n/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n\n\n\nconst options = {\n  host: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.host,\n  port: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.port,\n  password: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.password,\n  detect_buffer: true,\n  retry_startegy: function (options) {\n    if (options.error && options.error.code === 'ECONNREFUSED') {\n      return new Error('The server refused the connection');\n    }\n\n    if (options.total_retry_time > 1000 * 60 * 60) {\n      return new Error('Retry time exhausted'); // 重启次数用尽\n    }\n\n    if (options.attempt > 10) {\n      // End reconnecting with built in error\n      return undefined;\n    } // reconnect after\n\n\n    return Math.min(options.attempt * 100, 3000); // 返回数字，代表在多少毫秒后尝试\n  }\n};\nconst client = Object(bluebird__WEBPACK_IMPORTED_MODULE_1__[\"promisifyAll\"])(redis__WEBPACK_IMPORTED_MODULE_0___default.a.createClient(options));\nclient.on('error', err => {\n  console.log('Redis Client Error: ', err);\n});\n\nconst setValue = (key, value, time) => {\n  if (!value && value !== 0) {\n    return;\n  }\n\n  if (typeof value === 'object') {\n    // 存为hash\n    Object.keys(value).forEach(item => {\n      // hash的结构：key,field,value,以下是将hash表key中的域field设置为value[item]\n      client.hset(key, item, value[item], redis__WEBPACK_IMPORTED_MODULE_0___default.a.print); // redis.print打印redis返回的日志\n    });\n  } else {\n    if (time) {\n      client.set(key, value, 'EX', time); // 设置过期时间，按分钟计时\n    } else {\n      client.set(key, value);\n    }\n  }\n}; // node >= v8\n// const { promisify } = require('util')\n// const getAsync = promisify(client.get).bind(client)\n\n\nconst getValue = key => {\n  return client.getAsync(key);\n};\n\nconst getHValue = key => {\n  // return promisify(client.hgetall).bind(client)(key)\n  return client.hgetallAsync(key);\n};\n\nconst delValue = key => {\n  client.del(key, (err, res) => {\n    if (res === 1) {\n      console.log('delete successful');\n    } else {\n      console.log('delete redis key error:' + err);\n    }\n  });\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL1JlZGlzQ29uZmlnLmpzP2I3ODkiXSwibmFtZXMiOlsib3B0aW9ucyIsImhvc3QiLCJjb25maWciLCJSRURJUyIsInBvcnQiLCJwYXNzd29yZCIsImRldGVjdF9idWZmZXIiLCJyZXRyeV9zdGFydGVneSIsImVycm9yIiwiY29kZSIsIkVycm9yIiwidG90YWxfcmV0cnlfdGltZSIsImF0dGVtcHQiLCJ1bmRlZmluZWQiLCJNYXRoIiwibWluIiwiY2xpZW50IiwicHJvbWlzaWZ5QWxsIiwicmVkaXMiLCJjcmVhdGVDbGllbnQiLCJvbiIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlIiwidGltZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiaXRlbSIsImhzZXQiLCJwcmludCIsInNldCIsImdldFZhbHVlIiwiZ2V0QXN5bmMiLCJnZXRIVmFsdWUiLCJoZ2V0YWxsQXN5bmMiLCJkZWxWYWx1ZSIsImRlbCIsInJlcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxPQUFPLEdBQUc7QUFDZEMsTUFBSSxFQUFFQyw4Q0FBTSxDQUFDQyxLQUFQLENBQWFGLElBREw7QUFFZEcsTUFBSSxFQUFFRiw4Q0FBTSxDQUFDQyxLQUFQLENBQWFDLElBRkw7QUFHZEMsVUFBUSxFQUFFSCw4Q0FBTSxDQUFDQyxLQUFQLENBQWFFLFFBSFQ7QUFJZEMsZUFBYSxFQUFFLElBSkQ7QUFLZEMsZ0JBQWMsRUFBRSxVQUFVUCxPQUFWLEVBQW1CO0FBQ2pDLFFBQUlBLE9BQU8sQ0FBQ1EsS0FBUixJQUFpQlIsT0FBTyxDQUFDUSxLQUFSLENBQWNDLElBQWQsS0FBdUIsY0FBNUMsRUFBNEQ7QUFDMUQsYUFBTyxJQUFJQyxLQUFKLENBQVUsbUNBQVYsQ0FBUDtBQUNEOztBQUNELFFBQUlWLE9BQU8sQ0FBQ1csZ0JBQVIsR0FBMkIsT0FBTyxFQUFQLEdBQVksRUFBM0MsRUFBK0M7QUFDN0MsYUFBTyxJQUFJRCxLQUFKLENBQVUsc0JBQVYsQ0FBUCxDQUQ2QyxDQUNIO0FBQzNDOztBQUNELFFBQUlWLE9BQU8sQ0FBQ1ksT0FBUixHQUFrQixFQUF0QixFQUEwQjtBQUN4QjtBQUNBLGFBQU9DLFNBQVA7QUFDRCxLQVZnQyxDQVdqQzs7O0FBQ0EsV0FBT0MsSUFBSSxDQUFDQyxHQUFMLENBQVNmLE9BQU8sQ0FBQ1ksT0FBUixHQUFrQixHQUEzQixFQUFnQyxJQUFoQyxDQUFQLENBWmlDLENBWWE7QUFDL0M7QUFsQmEsQ0FBaEI7QUFxQkEsTUFBTUksTUFBTSxHQUFHQyw2REFBWSxDQUFDQyw0Q0FBSyxDQUFDQyxZQUFOLENBQW1CbkIsT0FBbkIsQ0FBRCxDQUEzQjtBQUVBZ0IsTUFBTSxDQUFDSSxFQUFQLENBQVUsT0FBVixFQUFtQkMsR0FBRyxJQUFJO0FBQ3hCQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ0YsR0FBcEM7QUFDRCxDQUZEOztBQUlBLE1BQU1HLFFBQVEsR0FBRyxDQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBYUMsSUFBYixLQUFzQjtBQUNyQyxNQUFJLENBQUNELEtBQUQsSUFBVUEsS0FBSyxLQUFLLENBQXhCLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBQ0QsTUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQUM7QUFDOUJFLFVBQU0sQ0FBQ0MsSUFBUCxDQUFZSCxLQUFaLEVBQW1CSSxPQUFuQixDQUEyQkMsSUFBSSxJQUFJO0FBRWpDO0FBQ0FmLFlBQU0sQ0FBQ2dCLElBQVAsQ0FBWVAsR0FBWixFQUFpQk0sSUFBakIsRUFBdUJMLEtBQUssQ0FBQ0ssSUFBRCxDQUE1QixFQUFvQ2IsNENBQUssQ0FBQ2UsS0FBMUMsRUFIaUMsQ0FHZ0I7QUFDbEQsS0FKRDtBQUtELEdBTkQsTUFNTztBQUNMLFFBQUlOLElBQUosRUFBVTtBQUNSWCxZQUFNLENBQUNrQixHQUFQLENBQVdULEdBQVgsRUFBZ0JDLEtBQWhCLEVBQXVCLElBQXZCLEVBQTZCQyxJQUE3QixFQURRLENBQzJCO0FBQ3BDLEtBRkQsTUFFTztBQUNMWCxZQUFNLENBQUNrQixHQUFQLENBQVdULEdBQVgsRUFBZ0JDLEtBQWhCO0FBQ0Q7QUFDRjtBQUNGLENBakJELEMsQ0FtQkE7QUFDQTtBQUNBOzs7QUFFQSxNQUFNUyxRQUFRLEdBQUdWLEdBQUcsSUFBSTtBQUN0QixTQUFPVCxNQUFNLENBQUNvQixRQUFQLENBQWdCWCxHQUFoQixDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxNQUFNWSxTQUFTLEdBQUdaLEdBQUcsSUFBSTtBQUV2QjtBQUNBLFNBQU9ULE1BQU0sQ0FBQ3NCLFlBQVAsQ0FBb0JiLEdBQXBCLENBQVA7QUFDRCxDQUpEOztBQU1BLE1BQU1jLFFBQVEsR0FBR2QsR0FBRyxJQUFJO0FBQ3RCVCxRQUFNLENBQUN3QixHQUFQLENBQVdmLEdBQVgsRUFBZ0IsQ0FBQ0osR0FBRCxFQUFNb0IsR0FBTixLQUFjO0FBQzVCLFFBQUlBLEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDYm5CLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0xELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUE0QkYsR0FBeEM7QUFDRDtBQUNGLEdBTkQ7QUFPRCxDQVJEIiwiZmlsZSI6Ii4vc3JjL2NvbmZpZy9SZWRpc0NvbmZpZy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWRpcyBmcm9tICdyZWRpcydcbmltcG9ydCB7IHByb21pc2lmeUFsbCB9IGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2luZGV4J1xuXG5jb25zdCBvcHRpb25zID0ge1xuICBob3N0OiBjb25maWcuUkVESVMuaG9zdCxcbiAgcG9ydDogY29uZmlnLlJFRElTLnBvcnQsXG4gIHBhc3N3b3JkOiBjb25maWcuUkVESVMucGFzc3dvcmQsXG4gIGRldGVjdF9idWZmZXI6IHRydWUsXG4gIHJldHJ5X3N0YXJ0ZWd5OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmVycm9yICYmIG9wdGlvbnMuZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1RoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgY29ubmVjdGlvbicpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50b3RhbF9yZXRyeV90aW1lID4gMTAwMCAqIDYwICogNjApIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1JldHJ5IHRpbWUgZXhoYXVzdGVkJyk7IC8vIOmHjeWQr+asoeaVsOeUqOWwvVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5hdHRlbXB0ID4gMTApIHtcbiAgICAgIC8vIEVuZCByZWNvbm5lY3Rpbmcgd2l0aCBidWlsdCBpbiBlcnJvclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gcmVjb25uZWN0IGFmdGVyXG4gICAgcmV0dXJuIE1hdGgubWluKG9wdGlvbnMuYXR0ZW1wdCAqIDEwMCwgMzAwMCk7IC8vIOi/lOWbnuaVsOWtl++8jOS7o+ihqOWcqOWkmuWwkeavq+enkuWQjuWwneivlVxuICB9XG59XG5cbmNvbnN0IGNsaWVudCA9IHByb21pc2lmeUFsbChyZWRpcy5jcmVhdGVDbGllbnQob3B0aW9ucykpXG5cbmNsaWVudC5vbignZXJyb3InLCBlcnIgPT4ge1xuICBjb25zb2xlLmxvZygnUmVkaXMgQ2xpZW50IEVycm9yOiAnLCBlcnIpXG59KVxuXG5jb25zdCBzZXRWYWx1ZSA9IChrZXksIHZhbHVlLCB0aW1lKSA9PiB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHsvLyDlrZjkuLpoYXNoXG4gICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goaXRlbSA9PiB7XG5cbiAgICAgIC8vIGhhc2jnmoTnu5PmnoTvvJprZXksZmllbGQsdmFsdWUs5Lul5LiL5piv5bCGaGFzaOihqGtleeS4reeahOWfn2ZpZWxk6K6+572u5Li6dmFsdWVbaXRlbV1cbiAgICAgIGNsaWVudC5oc2V0KGtleSwgaXRlbSwgdmFsdWVbaXRlbV0sIHJlZGlzLnByaW50KSAvLyByZWRpcy5wcmludOaJk+WNsHJlZGlz6L+U5Zue55qE5pel5b+XXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBpZiAodGltZSkge1xuICAgICAgY2xpZW50LnNldChrZXksIHZhbHVlLCAnRVgnLCB0aW1lKSAvLyDorr7nva7ov4fmnJ/ml7bpl7TvvIzmjInliIbpkp/orqHml7ZcbiAgICB9IGVsc2Uge1xuICAgICAgY2xpZW50LnNldChrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG4vLyBub2RlID49IHY4XG4vLyBjb25zdCB7IHByb21pc2lmeSB9ID0gcmVxdWlyZSgndXRpbCcpXG4vLyBjb25zdCBnZXRBc3luYyA9IHByb21pc2lmeShjbGllbnQuZ2V0KS5iaW5kKGNsaWVudClcblxuY29uc3QgZ2V0VmFsdWUgPSBrZXkgPT4ge1xuICByZXR1cm4gY2xpZW50LmdldEFzeW5jKGtleSlcbn1cblxuY29uc3QgZ2V0SFZhbHVlID0ga2V5ID0+IHtcblxuICAvLyByZXR1cm4gcHJvbWlzaWZ5KGNsaWVudC5oZ2V0YWxsKS5iaW5kKGNsaWVudCkoa2V5KVxuICByZXR1cm4gY2xpZW50LmhnZXRhbGxBc3luYyhrZXkpXG59XG5cbmNvbnN0IGRlbFZhbHVlID0ga2V5ID0+IHtcbiAgY2xpZW50LmRlbChrZXksIChlcnIsIHJlcykgPT4ge1xuICAgIGlmIChyZXMgPT09IDEpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkZWxldGUgc3VjY2Vzc2Z1bCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkZWxldGUgcmVkaXMga2V5IGVycm9yOicgKyBlcnIpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQge1xuICBzZXRWYWx1ZSxcbiAgZ2V0VmFsdWUsXG4gIGdldEhWYWx1ZSxcbiAgZGVsVmFsdWVcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/RedisConfig.js\n");

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst DB_URL = 'mongodb://test:123456@81.69.243.66:27017/testdb';\nconst REDIS = {\n  host: '81.69.243.66',\n  port: 15001,\n  password: '123456'\n};\nconst JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!';\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  DB_URL,\n  REDIS,\n  JWT_SECRET\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2luZGV4LmpzP2YxMjEiXSwibmFtZXMiOlsiREJfVVJMIiwiUkVESVMiLCJob3N0IiwicG9ydCIsInBhc3N3b3JkIiwiSldUX1NFQ1JFVCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFNQSxNQUFNLEdBQUcsaURBQWY7QUFDQSxNQUFNQyxLQUFLLEdBQUc7QUFDWkMsTUFBSSxFQUFFLGNBRE07QUFFWkMsTUFBSSxFQUFFLEtBRk07QUFHWkMsVUFBUSxFQUFFO0FBSEUsQ0FBZDtBQU1BLE1BQU1DLFVBQVUsR0FBRyxrRUFBbkI7QUFDZTtBQUNiTCxRQURhO0FBRWJDLE9BRmE7QUFHYkk7QUFIYSxDQUFmIiwiZmlsZSI6Ii4vc3JjL2NvbmZpZy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERCX1VSTCA9ICdtb25nb2RiOi8vdGVzdDoxMjM0NTZAODEuNjkuMjQzLjY2OjI3MDE3L3Rlc3RkYidcbmNvbnN0IFJFRElTID0ge1xuICBob3N0OiAnODEuNjkuMjQzLjY2JyxcbiAgcG9ydDogMTUwMDEsXG4gIHBhc3N3b3JkOiAnMTIzNDU2J1xufVxuXG5jb25zdCBKV1RfU0VDUkVUID0gJ2EmKjM4UXRoQUt1aVJ3SVNHTG90Z3FeMyVeJHp2QTNBNkhmcjhNRiRqTSpIWTQqZFdjd0FXJjlOR3A3KmI1MyEnXG5leHBvcnQgZGVmYXVsdCB7XG4gIERCX1VSTCxcbiAgUkVESVMsXG4gIEpXVF9TRUNSRVRcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/config/index.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router/router */ \"./src/router/router.js\");\n/* harmony import */ var koa_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-json */ \"koa-json\");\n/* harmony import */ var koa_json__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_json__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-body */ \"koa-body\");\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_body__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var koa_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-compose */ \"koa-compose\");\n/* harmony import */ var koa_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_compose__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @koa/cors */ \"@koa/cors\");\n/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_koa_cors__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-compress */ \"koa-compress\");\n/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_compress__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! koa-jwt */ \"koa-jwt\");\n/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(koa_jwt__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config/index */ \"./src/config/index.js\");\n/* harmony import */ var _common_ErrorHandle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/ErrorHandle */ \"./src/common/ErrorHandle.js\");\n// const Koa = require('koa');\n\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst helmet = __webpack_require__(/*! koa-helmet */ \"koa-helmet\"); //安全headers\n\n\nconst Static = __webpack_require__(/*! koa-static */ \"koa-static\");\n\n\n\n\n\n\n\n\n\n\nconst app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\nconst isDevMode =  false ? undefined : true; // 定义公共路径，不需要jwt鉴权\n\nconst jwt = koa_jwt__WEBPACK_IMPORTED_MODULE_7___default()({\n  secret: _config_index__WEBPACK_IMPORTED_MODULE_8__[\"default\"].JWT_SECRET\n}).unless({\n  path: [/^\\/public/, /\\/login/]\n}); // app.use(helmet());\n// app.use(static(__dirname));//访问根目录下所有文件\n// app.use(Static(path.join(__dirname, './static')));//访问static目录\n\nconst middleware = koa_compose__WEBPACK_IMPORTED_MODULE_4___default()([koa_body__WEBPACK_IMPORTED_MODULE_3___default()(), _koa_cors__WEBPACK_IMPORTED_MODULE_5___default()(), koa_json__WEBPACK_IMPORTED_MODULE_2___default()({\n  pretty: false,\n  param: 'pretty'\n}), helmet(), Static(path.join(__dirname, './static')), _common_ErrorHandle__WEBPACK_IMPORTED_MODULE_9__[\"default\"], jwt]);\n\nif (!isDevMode) {\n  koa_compress__WEBPACK_IMPORTED_MODULE_6___default()(koa_compress__WEBPACK_IMPORTED_MODULE_6___default()()); //压缩koa的中间件\n}\n\napp.use(middleware);\napp.use(Object(_router_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"])());\napp.listen(3000);\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsImhlbG1ldCIsIlN0YXRpYyIsImFwcCIsIktvYSIsImlzRGV2TW9kZSIsInByb2Nlc3MiLCJqd3QiLCJKV1QiLCJzZWNyZXQiLCJjb25maWciLCJKV1RfU0VDUkVUIiwidW5sZXNzIiwibWlkZGxld2FyZSIsIktvYUNvbXBvc2UiLCJrb2FCb2R5IiwiQ29ycyIsIktvYUpzb24iLCJwcmV0dHkiLCJwYXJhbSIsImpvaW4iLCJfX2Rpcm5hbWUiLCJlcnJvckhhbmRsZSIsImtvYUNvbXByZXNzIiwidXNlIiwicm91dGVyIiwibGlzdGVuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUNBLE1BQU1BLElBQUksR0FBR0MsbUJBQU8sQ0FBQyxrQkFBRCxDQUFwQjs7QUFDQSxNQUFNQyxNQUFNLEdBQUdELG1CQUFPLENBQUMsOEJBQUQsQ0FBdEIsQyxDQUFxQzs7O0FBQ3JDLE1BQU1FLE1BQU0sR0FBR0YsbUJBQU8sQ0FBQyw4QkFBRCxDQUF0Qjs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxNQUFNRyxHQUFHLEdBQUcsSUFBSUMsMENBQUosRUFBWjtBQUNBLE1BQU1DLFNBQVMsR0FBR0MsTUFBQSxHQUF3QyxTQUF4QyxHQUFnRCxJQUFsRSxDLENBRUE7O0FBQ0EsTUFBTUMsR0FBRyxHQUFHQyw4Q0FBRyxDQUFDO0FBQUNDLFFBQU0sRUFBRUMscURBQU0sQ0FBQ0M7QUFBaEIsQ0FBRCxDQUFILENBQWlDQyxNQUFqQyxDQUF3QztBQUFDYixNQUFJLEVBQUUsQ0FBQyxXQUFELEVBQWMsU0FBZDtBQUFQLENBQXhDLENBQVosQyxDQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNYyxVQUFVLEdBQUdDLGtEQUFVLENBQUMsQ0FDNUJDLCtDQUFPLEVBRHFCLEVBRTVCQyxnREFBSSxFQUZ3QixFQUc1QkMsK0NBQU8sQ0FBQztBQUFDQyxRQUFNLEVBQUUsS0FBVDtBQUFnQkMsT0FBSyxFQUFFO0FBQXZCLENBQUQsQ0FIcUIsRUFJNUJsQixNQUFNLEVBSnNCLEVBSzVCQyxNQUFNLENBQUNILElBQUksQ0FBQ3FCLElBQUwsQ0FBVUMsU0FBVixFQUFxQixVQUFyQixDQUFELENBTHNCLEVBTTVCQywyREFONEIsRUFPNUJmLEdBUDRCLENBQUQsQ0FBN0I7O0FBVUEsSUFBRyxDQUFDRixTQUFKLEVBQWM7QUFDWmtCLHFEQUFXLENBQUNBLG1EQUFXLEVBQVosQ0FBWCxDQURZLENBQ2U7QUFDNUI7O0FBRURwQixHQUFHLENBQUNxQixHQUFKLENBQVFYLFVBQVI7QUFDQVYsR0FBRyxDQUFDcUIsR0FBSixDQUFRQyw4REFBTSxFQUFkO0FBRUF0QixHQUFHLENBQUN1QixNQUFKLENBQVcsSUFBWCxFIiwiZmlsZSI6Ii4vc3JjL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uc3QgS29hID0gcmVxdWlyZSgna29hJyk7XG5pbXBvcnQgS29hIGZyb20gJ2tvYSdcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdrb2EtaGVsbWV0Jyk7Ly/lronlhahoZWFkZXJzXG5jb25zdCBTdGF0aWMgPSByZXF1aXJlKCdrb2Etc3RhdGljJyk7XG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVyL3JvdXRlcidcbmltcG9ydCBLb2FKc29uIGZyb20gJ2tvYS1qc29uJ1xuaW1wb3J0IGtvYUJvZHkgZnJvbSAna29hLWJvZHknXG5pbXBvcnQgS29hQ29tcG9zZSBmcm9tICdrb2EtY29tcG9zZSdcbmltcG9ydCBDb3JzIGZyb20gJ0Brb2EvY29ycydcbmltcG9ydCBrb2FDb21wcmVzcyBmcm9tICdrb2EtY29tcHJlc3MnXG5pbXBvcnQgSldUIGZyb20gJ2tvYS1qd3QnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnL2luZGV4J1xuaW1wb3J0IGVycm9ySGFuZGxlIGZyb20gJy4vY29tbW9uL0Vycm9ySGFuZGxlJ1xuXG5cbmNvbnN0IGFwcCA9IG5ldyBLb2EoKTtcbmNvbnN0IGlzRGV2TW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBmYWxzZSA6IHRydWU7XG5cbi8vIOWumuS5ieWFrOWFsei3r+W+hO+8jOS4jemcgOimgWp3dOmJtOadg1xuY29uc3Qgand0ID0gSldUKHtzZWNyZXQ6IGNvbmZpZy5KV1RfU0VDUkVUfSkudW5sZXNzKHtwYXRoOiBbL15cXC9wdWJsaWMvLCAvXFwvbG9naW4vXX0pO1xuXG4vLyBhcHAudXNlKGhlbG1ldCgpKTtcbi8vIGFwcC51c2Uoc3RhdGljKF9fZGlybmFtZSkpOy8v6K6/6Zeu5qC555uu5b2V5LiL5omA5pyJ5paH5Lu2XG4vLyBhcHAudXNlKFN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zdGF0aWMnKSkpOy8v6K6/6Zeuc3RhdGlj55uu5b2VXG5cbmNvbnN0IG1pZGRsZXdhcmUgPSBLb2FDb21wb3NlKFtcbiAga29hQm9keSgpLFxuICBDb3JzKCksXG4gIEtvYUpzb24oe3ByZXR0eTogZmFsc2UsIHBhcmFtOiAncHJldHR5J30pLFxuICBoZWxtZXQoKSxcbiAgU3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3N0YXRpYycpKSxcbiAgZXJyb3JIYW5kbGUsXG4gIGp3dFxuXSk7XG5cbmlmKCFpc0Rldk1vZGUpe1xuICBrb2FDb21wcmVzcyhrb2FDb21wcmVzcygpKTsvL+WOi+e8qWtvYeeahOS4remXtOS7tlxufVxuXG5hcHAudXNlKG1pZGRsZXdhcmUpO1xuYXBwLnVzZShyb3V0ZXIoKSk7XG5cbmFwcC5saXN0ZW4oMzAwMCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/model/user.js":
/*!***************************!*\
  !*** ./src/model/user.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_DBhelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/DBhelper */ \"./src/config/DBhelper.js\");\n\nlet Schema = _config_DBhelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Schema; // 对于mongoose，一切都是从schema中推导出来的，schema 定义数据结构、\n\nlet UserSchema = new Schema({\n  'username': {\n    type: String\n  },\n  'name': {\n    type: String\n  },\n  'password': {\n    type: String\n  }\n});\nlet UserModel = _config_DBhelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].model('users', UserSchema); // modle 创建和连接集合\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserModel);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvdXNlci5qcz83YmVlIl0sIm5hbWVzIjpbIlNjaGVtYSIsIm1vbmdvb3NlIiwiVXNlclNjaGVtYSIsInR5cGUiLCJTdHJpbmciLCJVc2VyTW9kZWwiLCJtb2RlbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBRUEsSUFBSUEsTUFBTSxHQUFHQyx3REFBUSxDQUFDRCxNQUF0QixDLENBQTZCOztBQUU3QixJQUFJRSxVQUFVLEdBQUcsSUFBSUYsTUFBSixDQUFXO0FBQzFCLGNBQVk7QUFBRUcsUUFBSSxFQUFFQztBQUFSLEdBRGM7QUFFMUIsVUFBUTtBQUFDRCxRQUFJLEVBQUVDO0FBQVAsR0FGa0I7QUFHMUIsY0FBWTtBQUFFRCxRQUFJLEVBQUVDO0FBQVI7QUFIYyxDQUFYLENBQWpCO0FBTUEsSUFBSUMsU0FBUyxHQUFHSix3REFBUSxDQUFDSyxLQUFULENBQWUsT0FBZixFQUF3QkosVUFBeEIsQ0FBaEIsQyxDQUFvRDs7QUFFckNHLHdFQUFmIiwiZmlsZSI6Ii4vc3JjL21vZGVsL3VzZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnLi4vY29uZmlnL0RCaGVscGVyJ1xuXG5sZXQgU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hIC8vIOWvueS6jm1vbmdvb3Nl77yM5LiA5YiH6YO95piv5LuOc2NoZW1h5Lit5o6o5a+85Ye65p2l55qE77yMc2NoZW1hIOWumuS5ieaVsOaNrue7k+aehOOAgVxuXG5sZXQgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAndXNlcm5hbWUnOiB7IHR5cGU6IFN0cmluZyB9LFxuICAnbmFtZSc6IHt0eXBlOiBTdHJpbmd9LFxuICAncGFzc3dvcmQnOiB7IHR5cGU6IFN0cmluZyB9XG59KVxuXG5sZXQgVXNlck1vZGVsID0gbW9uZ29vc2UubW9kZWwoJ3VzZXJzJywgVXNlclNjaGVtYSkgLy8gbW9kbGUg5Yib5bu65ZKM6L+e5o6l6ZuG5ZCIXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJNb2RlbFxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/model/user.js\n");

/***/ }),

/***/ "./src/router/loginRouter.js":
/*!***********************************!*\
  !*** ./src/router/loginRouter.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_LoginController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/LoginController */ \"./src/api/LoginController.js\");\n\n\nconst router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();\nrouter.prefix('/login');\nrouter.post('/forget', _api_LoginController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].forget);\nrouter.post('/login', _api_LoginController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].login);\nrouter.post('/reg', _api_LoginController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].reg);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyL2xvZ2luUm91dGVyLmpzPzExN2EiXSwibmFtZXMiOlsicm91dGVyIiwiUm91dGVyIiwicHJlZml4IiwicG9zdCIsImxvZ2luQ29udHJvbGxlciIsImZvcmdldCIsImxvZ2luIiwicmVnIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsaURBQUosRUFBZjtBQUVBRCxNQUFNLENBQUNFLE1BQVAsQ0FBYyxRQUFkO0FBQ0FGLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLFNBQVosRUFBdUJDLDREQUFlLENBQUNDLE1BQXZDO0FBQ0FMLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLFFBQVosRUFBc0JDLDREQUFlLENBQUNFLEtBQXRDO0FBQ0FOLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLE1BQVosRUFBb0JDLDREQUFlLENBQUNHLEdBQXBDO0FBRWVQLHFFQUFmIiwiZmlsZSI6Ii4vc3JjL3JvdXRlci9sb2dpblJvdXRlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZXIgZnJvbSAna29hLXJvdXRlcidcbmltcG9ydCBsb2dpbkNvbnRyb2xsZXIgZnJvbSAnLi4vYXBpL0xvZ2luQ29udHJvbGxlcidcblxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXG5cbnJvdXRlci5wcmVmaXgoJy9sb2dpbicpO1xucm91dGVyLnBvc3QoJy9mb3JnZXQnLCBsb2dpbkNvbnRyb2xsZXIuZm9yZ2V0KVxucm91dGVyLnBvc3QoJy9sb2dpbicsIGxvZ2luQ29udHJvbGxlci5sb2dpbilcbnJvdXRlci5wb3N0KCcvcmVnJywgbG9naW5Db250cm9sbGVyLnJlZylcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/router/loginRouter.js\n");

/***/ }),

/***/ "./src/router/publicRouter.js":
/*!************************************!*\
  !*** ./src/router/publicRouter.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_PublicController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/PublicController */ \"./src/api/PublicController.js\");\nconst Router = __webpack_require__(/*! koa-router */ \"koa-router\");\n\n\nconst router = new Router();\nrouter.prefix('/public');\nrouter.get('/getCaptcha', _api_PublicController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCaptcha); // module.exports = router;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyL3B1YmxpY1JvdXRlci5qcz9jOGEyIl0sIm5hbWVzIjpbIlJvdXRlciIsInJlcXVpcmUiLCJyb3V0ZXIiLCJwcmVmaXgiLCJnZXQiLCJQdWJsaWNDb250cm9sbGVyIiwiZ2V0Q2FwdGNoYSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBLE1BQU1BLE1BQU0sR0FBR0MsbUJBQU8sQ0FBQyw4QkFBRCxDQUF0Qjs7QUFDQTtBQUVBLE1BQU1DLE1BQU0sR0FBRyxJQUFJRixNQUFKLEVBQWY7QUFFQUUsTUFBTSxDQUFDQyxNQUFQLENBQWMsU0FBZDtBQUNBRCxNQUFNLENBQUNFLEdBQVAsQ0FBVyxhQUFYLEVBQTBCQyw2REFBZ0IsQ0FBQ0MsVUFBM0MsRSxDQUVBOztBQUNlSixxRUFBZiIsImZpbGUiOiIuL3NyYy9yb3V0ZXIvcHVibGljUm91dGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUm91dGVyID0gcmVxdWlyZSgna29hLXJvdXRlcicpO1xuaW1wb3J0IFB1YmxpY0NvbnRyb2xsZXIgZnJvbSAnLi4vYXBpL1B1YmxpY0NvbnRyb2xsZXInO1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5cbnJvdXRlci5wcmVmaXgoJy9wdWJsaWMnKTtcbnJvdXRlci5nZXQoJy9nZXRDYXB0Y2hhJywgUHVibGljQ29udHJvbGxlci5nZXRDYXB0Y2hhKTtcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/router/publicRouter.js\n");

/***/ }),

/***/ "./src/router/router.js":
/*!******************************!*\
  !*** ./src/router/router.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _publicRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./publicRouter */ \"./src/router/publicRouter.js\");\n/* harmony import */ var _loginRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginRouter */ \"./src/router/loginRouter.js\");\nconst combineRouters = __webpack_require__(/*! koa-combine-routers */ \"koa-combine-routers\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (combineRouters(_publicRouter__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _loginRouter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyL3JvdXRlci5qcz85ODgzIl0sIm5hbWVzIjpbImNvbWJpbmVSb3V0ZXJzIiwicmVxdWlyZSIsInB1YmxpY1JvdXRlciIsImxvZ2luUm91dGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFNQSxjQUFjLEdBQUdDLG1CQUFPLENBQUMsZ0RBQUQsQ0FBOUI7O0FBRUE7QUFDQTtBQUVlRCw2RUFBYyxDQUFDRSxxREFBRCxFQUFlQyxvREFBZixDQUE3QiIsImZpbGUiOiIuL3NyYy9yb3V0ZXIvcm91dGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29tYmluZVJvdXRlcnMgPSByZXF1aXJlKCdrb2EtY29tYmluZS1yb3V0ZXJzJylcblxuaW1wb3J0IHB1YmxpY1JvdXRlciBmcm9tICcuL3B1YmxpY1JvdXRlcidcbmltcG9ydCBsb2dpblJvdXRlciBmcm9tICcuL2xvZ2luUm91dGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUm91dGVycyhwdWJsaWNSb3V0ZXIsIGxvZ2luUm91dGVyKSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/router/router.js\n");

/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@koa/cors\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAa29hL2NvcnNcIj9hNjk1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IkBrb2EvY29ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBrb2EvY29yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@koa/cors\n");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIj9jZjljIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImJjcnlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bcrypt\n");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bluebird\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJibHVlYmlyZFwiPzJjNmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYmx1ZWJpcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bluebird\n");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIj82NDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Impzb253ZWJ0b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jsonwebtoken\n");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2FcIj9lZWI5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImtvYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa\n");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-body\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtYm9keVwiPzNmNjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWJvZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtYm9keVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-body\n");

/***/ }),

/***/ "koa-combine-routers":
/*!**************************************!*\
  !*** external "koa-combine-routers" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-combine-routers\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tYmluZS1yb3V0ZXJzXCI/MmM3NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2EtY29tYmluZS1yb3V0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWNvbWJpbmUtcm91dGVyc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-combine-routers\n");

/***/ }),

/***/ "koa-compose":
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcG9zZVwiPzczMTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWNvbXBvc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtY29tcG9zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-compose\n");

/***/ }),

/***/ "koa-compress":
/*!*******************************!*\
  !*** external "koa-compress" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compress\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcHJlc3NcIj9hNmY2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImtvYS1jb21wcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1jb21wcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-compress\n");

/***/ }),

/***/ "koa-helmet":
/*!*****************************!*\
  !*** external "koa-helmet" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-helmet\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtaGVsbWV0XCI/NDJkMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2EtaGVsbWV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWhlbG1ldFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-helmet\n");

/***/ }),

/***/ "koa-json":
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-json\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtanNvblwiPzY1MjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtanNvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-json\n");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-jwt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etand0XCI/ZWIwZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etand0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWp3dFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-jwt\n");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etcm91dGVyXCI/MDM1ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etcm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXJvdXRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-router\n");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etc3RhdGljXCI/OWE0YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXN0YXRpY1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-static\n");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIj9iZDc2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im1vbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///moment\n");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiP2ZmZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongoose\n");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlbWFpbGVyXCI/M2Q1NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJub2RlbWFpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///nodemailer\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWRpc1wiPzcwNmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redis\n");

/***/ }),

/***/ "svg-captcha":
/*!******************************!*\
  !*** external "svg-captcha" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"svg-captcha\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdmctY2FwdGNoYVwiP2NjNjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3ZnLWNhcHRjaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdmctY2FwdGNoYVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///svg-captcha\n");

/***/ })

/******/ });