"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var dotenv = require('dotenv');
var ms_to_sec = 1000;
var sec_to_hour = 3600;
// Load environment variables from .env file
dotenv.config();
function parseDate(dateString) {
    return new Date(dateString);
}
function fetchClosedPullRequests(owner, repo, accessToken, maxCount, page) {
    if (maxCount === void 0) { maxCount = 50; }
    if (page === void 0) { page = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var perPage, apiUrl, response, closedPullRequests, totalCount, nextPageClosedPullRequests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    perPage = 50;
                    apiUrl = "https://api.github.com/repos/".concat(owner, "/").concat(repo, "/issues?state=closed&page=").concat(page, "&per_page=").concat(perPage);
                    return [4 /*yield*/, (0, node_fetch_1.default)(apiUrl, {
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                                'User-Agent': 'GitHub-Pull-Request-Fetcher',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("GitHub API request failed: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    closedPullRequests = _a.sent();
                    totalCount = closedPullRequests.length;
                    if (!((closedPullRequests.length === perPage) && (totalCount < maxCount))) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchClosedPullRequests(owner, repo, accessToken, maxCount - totalCount, page + 1)];
                case 3:
                    nextPageClosedPullRequests = _a.sent();
                    return [2 /*return*/, __spreadArray(__spreadArray([], closedPullRequests, true), nextPageClosedPullRequests, true)];
                case 4: return [2 /*return*/, closedPullRequests];
            }
        });
    });
}
function fetchClosedPullRequestData(owner, repo, accessToken, pullRequestNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response, pullRequestData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://api.github.com/repos/".concat(owner, "/").concat(repo, "/issues/").concat(pullRequestNumber);
                    return [4 /*yield*/, (0, node_fetch_1.default)(apiUrl, {
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                                'User-Agent': 'GitHub-Pull-Request-Fetcher',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("GitHub API request failed: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    pullRequestData = _a.sent();
                    return [2 /*return*/, pullRequestData];
            }
        });
    });
}
function findMedian(numbers) {
    // Step 1: Sort the list
    var sortedNumbers = numbers.slice().sort(function (a, b) { return a - b; });
    var middleIndex = Math.floor(sortedNumbers.length / 2);
    if (sortedNumbers.length % 2 === 0) {
        // Even number of elements, so take the average of the two middle elements
        var middle1 = sortedNumbers[middleIndex - 1];
        var middle2 = sortedNumbers[middleIndex];
        return (middle1 + middle2) / 2;
    }
    else {
        // Odd number of elements, so the middle element is the median
        return sortedNumbers[middleIndex];
    }
}
var owner = 'browserify';
var repo = 'browserify';
var accessToken = process.env.GITHUB_TOKEN || '';
var score_list = [];
fetchClosedPullRequests(owner, repo, accessToken)
    .then(function (closedPullRequests) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, closedPullRequests_1, pr, pullRequestData, created, closed_1, diff, median;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, closedPullRequests_1 = closedPullRequests;
                _a.label = 1;
            case 1:
                if (!(_i < closedPullRequests_1.length)) return [3 /*break*/, 4];
                pr = closedPullRequests_1[_i];
                return [4 /*yield*/, fetchClosedPullRequestData(owner, repo, accessToken, pr.number)];
            case 2:
                pullRequestData = _a.sent();
                created = parseDate(pr.created_at);
                console.log(pr.created_at);
                closed_1 = parseDate(pullRequestData.closed_at);
                diff = (closed_1.valueOf() - created.valueOf()) / (ms_to_sec * sec_to_hour * 24);
                score_list.push(diff);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                median = findMedian(score_list);
                console.log("Median:", median);
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) {
    console.error('Error fetching closed pull requests:', error);
});
