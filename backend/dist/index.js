"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/vary/index.js
var require_vary = __commonJS({
  "node_modules/vary/index.js"(exports2, module2) {
    "use strict";
    module2.exports = vary;
    module2.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i] : fields[i];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// node_modules/cors/lib/index.js
var require_lib = __commonJS({
  "node_modules/cors/lib/index.js"(exports2, module2) {
    "use strict";
    (function() {
      "use strict";
      var assign = require_object_assign();
      var vary = require_vary();
      var defaults = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      function isString(s) {
        return typeof s === "string" || s instanceof String;
      }
      function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
          for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
              return true;
            }
          }
          return false;
        } else if (isString(allowedOrigin)) {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        } else {
          return !!allowedOrigin;
        }
      }
      function configureOrigin(options, req) {
        var requestOrigin = req.headers.origin, headers = [], isAllowed;
        if (!options.origin || options.origin === "*") {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: "*"
          }]);
        } else if (isString(options.origin)) {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: options.origin
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        } else {
          isAllowed = isOriginAllowed(requestOrigin, options.origin);
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: isAllowed ? requestOrigin : false
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        }
        return headers;
      }
      function configureMethods(options) {
        var methods = options.methods;
        if (methods.join) {
          methods = options.methods.join(",");
        }
        return {
          key: "Access-Control-Allow-Methods",
          value: methods
        };
      }
      function configureCredentials(options) {
        if (options.credentials === true) {
          return {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          };
        }
        return null;
      }
      function configureAllowedHeaders(options, req) {
        var allowedHeaders = options.allowedHeaders || options.headers;
        var headers = [];
        if (!allowedHeaders) {
          allowedHeaders = req.headers["access-control-request-headers"];
          headers.push([{
            key: "Vary",
            value: "Access-Control-Request-Headers"
          }]);
        } else if (allowedHeaders.join) {
          allowedHeaders = allowedHeaders.join(",");
        }
        if (allowedHeaders && allowedHeaders.length) {
          headers.push([{
            key: "Access-Control-Allow-Headers",
            value: allowedHeaders
          }]);
        }
        return headers;
      }
      function configureExposedHeaders(options) {
        var headers = options.exposedHeaders;
        if (!headers) {
          return null;
        } else if (headers.join) {
          headers = headers.join(",");
        }
        if (headers && headers.length) {
          return {
            key: "Access-Control-Expose-Headers",
            value: headers
          };
        }
        return null;
      }
      function configureMaxAge(options) {
        var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
        if (maxAge && maxAge.length) {
          return {
            key: "Access-Control-Max-Age",
            value: maxAge
          };
        }
        return null;
      }
      function applyHeaders(headers, res) {
        for (var i = 0, n = headers.length; i < n; i++) {
          var header = headers[i];
          if (header) {
            if (Array.isArray(header)) {
              applyHeaders(header, res);
            } else if (header.key === "Vary" && header.value) {
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors2(options, req, res, next) {
        var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureMethods(options, req));
          headers.push(configureAllowedHeaders(options, req));
          headers.push(configureMaxAge(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          if (options.preflightContinue) {
            next();
          } else {
            res.statusCode = options.optionsSuccessStatus;
            res.setHeader("Content-Length", "0");
            res.end();
          }
        } else {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          next();
        }
      }
      function middlewareWrapper(o) {
        var optionsCallback = null;
        if (typeof o === "function") {
          optionsCallback = o;
        } else {
          optionsCallback = function(req, cb) {
            cb(null, o);
          };
        }
        return function corsMiddleware(req, res, next) {
          optionsCallback(req, function(err, options) {
            if (err) {
              next(err);
            } else {
              var corsOptions = assign({}, defaults, options);
              var originCallback = null;
              if (corsOptions.origin && typeof corsOptions.origin === "function") {
                originCallback = corsOptions.origin;
              } else if (corsOptions.origin) {
                originCallback = function(origin, cb) {
                  cb(null, corsOptions.origin);
                };
              }
              if (originCallback) {
                originCallback(req.headers.origin, function(err2, origin) {
                  if (err2 || !origin) {
                    next(err2);
                  } else {
                    corsOptions.origin = origin;
                    cors2(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module2.exports = middlewareWrapper;
    })();
  }
});

// src/index.ts
var import_dotenv2 = __toESM(require("dotenv"));

// src/utils/config.ts
var import_dotenv = __toESM(require("dotenv"));
var import_envalid = require("envalid");
import_dotenv.default.config();
var env = (0, import_envalid.cleanEnv)(process.env, {
  NODE_ENV: (0, import_envalid.str)({
    devDefault: (0, import_envalid.testOnly)("test"),
    choices: ["development", "production", "test"]
  }),
  HOST: (0, import_envalid.host)({ devDefault: (0, import_envalid.testOnly)("localhost") }),
  PORT: (0, import_envalid.port)({ devDefault: (0, import_envalid.testOnly)(3e3) }),
  CORS_ORIGIN: (0, import_envalid.str)({ devDefault: (0, import_envalid.testOnly)("http://localhost:3000") }),
  PG_URL: (0, import_envalid.str)(),
  MONGO_URL: (0, import_envalid.str)({
    devDefault: (0, import_envalid.testOnly)("mongodb://user:password@127.0.0.1:27017/test")
  })
});

// src/logger/index.ts
var import_winston = __toESM(require("winston"));
var logger = import_winston.default.createLogger({
  level: "info",
  format: import_winston.default.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new import_winston.default.transports.File({ filename: "error.log", level: "error" }),
    new import_winston.default.transports.Console({ format: import_winston.default.format.simple() })
  ]
});
if (env.NODE_ENV !== "production") {
  logger.add(
    new import_winston.default.transports.Console({
      format: import_winston.default.format.simple()
    })
  );
}
var logger_default = logger;

// src/server.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require_lib());
var import_helmet = __toESM(require("helmet"));
var import_express4 = require("@apollo/server/express4");

// src/database/sql/models/author.ts
var import_core = require("@sequelize/core");
var import_decorators_legacy = require("@sequelize/core/decorators-legacy");

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/database/sql/models/author.ts
var Author = class extends import_core.Model {
};
__decorateClass([
  (0, import_decorators_legacy.Attribute)(import_core.DataTypes.UUID),
  import_decorators_legacy.PrimaryKey,
  (0, import_decorators_legacy.Default)(() => `${v4_default()}`)
], Author.prototype, "id", 2);
__decorateClass([
  (0, import_decorators_legacy.Attribute)(import_core.DataTypes.STRING),
  import_decorators_legacy.NotNull
], Author.prototype, "name", 2);
__decorateClass([
  (0, import_decorators_legacy.Attribute)(import_core.DataTypes.TEXT),
  import_decorators_legacy.NotNull
], Author.prototype, "biography", 2);
__decorateClass([
  (0, import_decorators_legacy.Attribute)(import_core.DataTypes.DATEONLY),
  import_decorators_legacy.NotNull
], Author.prototype, "bornDate", 2);
Author = __decorateClass([
  (0, import_decorators_legacy.Table)({
    tableName: "Authors",
    timestamps: true
  })
], Author);

// src/database/sql/models/book.ts
var import_core2 = require("@sequelize/core");
var import_decorators_legacy2 = require("@sequelize/core/decorators-legacy");
(0, import_decorators_legacy2.Table)({
  tableName: "Books",
  timestamps: true
});
var Book = class extends import_core2.Model {
};
__decorateClass([
  (0, import_decorators_legacy2.Attribute)(import_core2.DataTypes.UUID),
  import_decorators_legacy2.PrimaryKey,
  (0, import_decorators_legacy2.Default)(() => `${v4_default()}`)
], Book.prototype, "id", 2);
__decorateClass([
  (0, import_decorators_legacy2.Attribute)(import_core2.DataTypes.STRING),
  import_decorators_legacy2.NotNull
], Book.prototype, "title", 2);
__decorateClass([
  (0, import_decorators_legacy2.Attribute)(import_core2.DataTypes.TEXT)
], Book.prototype, "description", 2);
__decorateClass([
  (0, import_decorators_legacy2.Attribute)(import_core2.DataTypes.DATEONLY),
  import_decorators_legacy2.NotNull
], Book.prototype, "publishedDate", 2);
__decorateClass([
  (0, import_decorators_legacy2.Attribute)(import_core2.DataTypes.STRING),
  import_decorators_legacy2.NotNull
], Book.prototype, "authorId", 2);

// src/database/sql/models/index.ts
var createAssociations = () => {
  Book.belongsTo(Author, {
    foreignKey: "authorId",
    targetKey: "id",
    as: "books",
    foreignKeyConstraints: true
  });
  Author.hasMany(Book, {
    foreignKey: "authorId",
    sourceKey: "id",
    as: "books",
    foreignKeyConstraints: true
  });
  Author.sync();
  Book.sync();
};

// src/database/sql/connection.ts
var import_core3 = require("@sequelize/core");
var sequelize = new import_core3.Sequelize({
  dialect: "postgres",
  schema: "public",
  models: [Author, Book],
  url: env.PG_URL
});
createAssociations();
var establishSequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// src/graphql/server.ts
var import_server = require("@apollo/server");

// src/services/queryUtils.ts
var import_sequelize = require("sequelize");
var createPaginationQuery = (pageSize = 10, page = 1) => {
  return {
    limit: pageSize ?? 10,
    offset: ((page || 1) - 1) * (pageSize ?? 10)
  };
};
var createMongoPaginationQuery = (pageSize = 10, page = 1) => {
  return {
    limit: pageSize ?? 10,
    skip: ((page || 1) - 1) * (pageSize ?? 10)
  };
};
var createFullTextSearchFilterQuery = (filterOptions) => {
  return Object.fromEntries(
    Object.entries(filterOptions).filter(([_, val]) => !!val).map(([key, val]) => [key, { [import_sequelize.Op.iLike]: `%${val}%` }])
  );
};
var createDateFilterQuery = (filterOptions) => {
  const result = {};
  for (const [key, { gte, lte }] of Object.entries(filterOptions)) {
    if (!gte && !lte) continue;
    result[key] = {};
    if (gte) result[key][import_sequelize.Op.gte] = new Date(gte);
    if (lte) result[key][import_sequelize.Op.lte] = new Date(lte);
  }
  return result;
};

// src/services/author.ts
var AuthorService = class {
  async create(attributes) {
    const [author, isCreated] = await Author.findOrBuild({
      where: { name: attributes.name },
      defaults: attributes
    });
    if (isCreated) {
      await author.save();
    }
    return author;
  }
  async delete(id) {
    await Author.destroy({
      where: {
        id
      }
    });
    return id;
  }
  async update(id, authorDetails) {
    const authors = await Author.update(authorDetails, {
      where: {
        id
      },
      returning: true,
      limit: 1
    });
    return authors[1][0];
  }
  async search(args) {
    const authors = [];
    let totalCount = 1;
    if (args.authorId) {
      const author = await Author.findByPk(args.authorId);
      if (author) {
        authors.push(author);
      }
    } else {
      const { rows, count } = await Author.findAndCountAll({
        where: Object.keys(args).length > 0 ? {
          ...createFullTextSearchFilterQuery({
            name: args.name
          }),
          ...createDateFilterQuery({
            bornDate: {
              gte: args.fromBornDate,
              lte: args.toBornDate
            }
          })
        } : void 0,
        ...createPaginationQuery(args.pageSize, args.page)
      });
      totalCount = count;
      authors.push(...rows);
    }
    return {
      items: authors,
      page: args.page || 1,
      pageSize: args.pageSize ? totalCount < args.pageSize ? totalCount : args.pageSize : totalCount,
      total: totalCount,
      hasNextPage: totalCount > (args.page || 1) * (args.pageSize ?? 10)
    };
  }
  async getById(id) {
    if (!id) {
      return null;
    }
    const author = await Author.findByPk(id);
    return author;
  }
};
var authorService = new AuthorService();

// src/database/mongo/models/review.ts
var import_mongoose = __toESM(require("mongoose"));
var bookReviewSchema = new import_mongoose.default.Schema(
  {
    bookId: { type: String, required: true },
    reviewerName: { type: String, required: true },
    location: { type: Object, required: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  { timestamps: true }
);
var Review = import_mongoose.default.model(
  "BookReview",
  bookReviewSchema
);

// src/database/mongo/connection.ts
var import_mongoose2 = __toESM(require("mongoose"));
var establishMongoConnection = async () => {
  try {
    await import_mongoose2.default.connect(env.MONGO_URL);
    console.log("MongoDb Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// src/services/review.ts
var ReviewService = class {
  async getAll(bookId, paginationArgs) {
    const aggArgument = [
      {
        $match: {
          bookId
        }
      },
      { $count: "totalCount" }
    ];
    const result = await Review.aggregate(aggArgument);
    const totalCount = result?.length ? result[0].totalCount : 0;
    const reviews = await Review.find(
      {
        bookId
      },
      void 0,
      createMongoPaginationQuery(
        paginationArgs?.pageSize,
        paginationArgs?.page
      )
    );
    return {
      items: reviews.map(
        (review) => ({
          id: review.id,
          bookId: review.bookId,
          reviewerName: review.reviewerName ?? "ANONYMOUS",
          title: review.title,
          content: review.content,
          rating: review.rating,
          country: review.location?.country,
          createdAt: review.createdAt.toISOString(),
          updatedAt: review.updatedAt.toISOString()
        })
      ),
      page: paginationArgs?.page || 1,
      pageSize: paginationArgs?.pageSize ? totalCount < paginationArgs?.pageSize ? totalCount : paginationArgs.pageSize : totalCount,
      total: totalCount,
      hasNextPage: totalCount > (paginationArgs?.page || 1) * (paginationArgs?.pageSize ?? 10)
    };
  }
  async create(args) {
    const book = await Book.findByPk(args.bookId);
    if (!book) {
      throw new Error(
        `BadRequestExecption: ${args.bookId} is not a valid bookId`
      );
    }
    const review = await Review.create({
      ...args,
      location: args.reviewerLocation
    });
    return {
      ...review,
      id: review.id,
      country: review.location?.country,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString()
    };
  }
  async deleteBookReviews(bookId) {
    const { deletedCount } = await Review.deleteMany({
      bookId
    });
    return deletedCount;
  }
  async getBookRating(bookId) {
    const data = await Review.aggregate([
      {
        $match: {
          bookId
        }
      },
      {
        $group: {
          _id: "$bookId",
          rating: {
            $avg: "$rating"
          }
        }
      }
    ]);
    return data[0]?.rating;
  }
};
var reviewService = new ReviewService();

// src/services/book.ts
var BookService = class {
  async create(attributes, authorAttributes) {
    const [book, isCreated] = await Book.findOrBuild({
      where: { title: attributes.title },
      defaults: attributes
    });
    if (isCreated) {
      await book.save();
      if (authorAttributes) {
        const [author, isCreated2] = await Author.findOrBuild({
          where: { name: authorAttributes.name },
          defaults: authorAttributes
        });
        if (isCreated2) {
          await author.save();
          book.set("authorId", author.id);
        }
      }
    }
    return book;
  }
  async delete(id) {
    await Book.destroy({
      where: {
        id
      }
    });
    await reviewService.deleteBookReviews(id);
    return id;
  }
  async update(id, bookDetails) {
    const books = await Book.update(bookDetails, {
      where: {
        id
      },
      returning: true,
      limit: 1
    });
    return books[1][0];
  }
  async search(args) {
    const books = [];
    let totalCount = 1;
    if (args.bookId) {
      const book = await Book.findByPk(args.bookId);
      if (book) {
        books.push(book);
      }
    } else {
      const { rows, count } = await Book.findAndCountAll({
        where: {
          ...createFullTextSearchFilterQuery({
            title: args.title
          }),
          ...createDateFilterQuery({
            publishedDate: {
              gte: args.fromPublishedDate,
              lte: args.toPublishedDate
            }
          })
        },
        ...createPaginationQuery(args.pageSize, args.page)
      });
      totalCount = count;
      books.push(...rows);
    }
    return {
      items: books,
      page: args.page || 1,
      pageSize: args.pageSize ? totalCount < args.pageSize ? totalCount : args.pageSize : totalCount,
      total: totalCount,
      hasNextPage: totalCount > (args.page || 1) * (args.pageSize ?? 10)
    };
  }
  async getByAuthorId(authorId, args) {
    const { rows: books, count } = await Book.findAndCountAll({
      where: {
        authorId
      },
      ...createPaginationQuery(args.pageSize, args.page)
    });
    return {
      items: books,
      page: args.page || 1,
      pageSize: args.pageSize ? count < args.pageSize ? count : args.pageSize : count,
      total: count,
      hasNextPage: count > (args.page || 1) * (args.pageSize ?? 10)
    };
  }
  async getById(id) {
    if (!id) {
      return null;
    }
    const book = await Book.findByPk(id);
    return book;
  }
};
var bookService = new BookService();

// src/graphql/resolvers.ts
var resolvers = {
  Mutation: {
    addAuthor: async (_, args) => authorService.create(args),
    addBook: async (_, args) => bookService.create(args),
    updateAuthor: async (_, args) => authorService.update(args.id, args),
    updateBook: async (_, args) => bookService.update(args.id, args),
    deleteAuthor: async (_, args) => authorService.delete(args.id),
    deleteBook: async (_, args) => bookService.delete(args.id),
    addReview: async (_, args) => reviewService.create(args)
  },
  Query: {
    books: async (_, args) => {
      return bookService.search(args);
    },
    authors: async (_, args) => {
      return authorService.search(args);
    },
    bookReviews: async (_, args) => {
      return {
        bookId: args.bookId,
        overallRating: await reviewService.getBookRating(args.bookId),
        reviews: await reviewService.getAll(args.bookId)
      };
    }
  },
  Book: {
    author: async (book, _, contextValue) => {
      if (!book.authorId) return null;
      return await contextValue.loaders.authors.load(book.authorId);
    },
    createdAt: (book) => book.createdAt.toISOString(),
    updatedAt: (book) => book.updatedAt.toISOString()
  },
  Author: {
    books: async (author, args) => {
      return await bookService.getByAuthorId(author.id, args);
    },
    createdAt: (book) => book.createdAt.toISOString(),
    updatedAt: (book) => book.updatedAt.toISOString()
  },
  BookReview: {
    reviews: async (bookReview, args) => {
      return await reviewService.getAll(bookReview.bookId, {
        pageSize: args.pageSize,
        page: args.page
      });
    }
  }
};

// src/graphql/server.ts
var import_graphql_constraint_directive = require("graphql-constraint-directive");
var import_dataloader = __toESM(require("dataloader"));
var import_schema = require("@graphql-tools/schema");

// src/graphql/schema.graphql
var documentNode = { "kind": "Document", "definitions": [{ "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "Author" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "name" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "biography" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "bornDate" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "books" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookId" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "fromPublishedDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "toPublishedDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PaginatedBooks" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "createdAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "updatedAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "ReviewLocation" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "country" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "city" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }] }, { "kind": "InputObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "LocationInput" }, "directives": [], "fields": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "country" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "city" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "ReviewItem" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "reviewerName" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookId" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "country" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "content" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "rating" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "createdAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "updatedAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "Book" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "description" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "publishedDate" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "author" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Author" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "createdAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "updatedAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "BookReview" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookId" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "overallRating" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "reviews" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PaginatedReviews" } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "PaginatedReviews" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "items" }, "arguments": [], "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ReviewItem" } } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "total" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "hasNextPage" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "PaginatedAuthors" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "items" }, "arguments": [], "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Author" } } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "total" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "hasNextPage" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "PaginatedBooks" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "items" }, "arguments": [], "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Book" } } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "total" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "hasNextPage" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "Mutation" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "addAuthor" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "name" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "biography" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "bornDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "date", "block": false } }] }] }], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Author" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "addBook" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "description" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "publishedDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "date", "block": false } }] }] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "authorId" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "uuid", "block": false } }] }] }], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Book" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "updateAuthor" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "uuid", "block": false } }] }] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "name" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "biography" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "maxLength" }, "value": { "kind": "IntValue", "value": "1000" } }] }] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "bornDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "date", "block": false } }] }] }], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Author" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "updateBook" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "uuid", "block": false } }] }] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "description" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "publishedDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "authorId" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Book" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "deleteAuthor" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "deleteBook" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "id" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "addReview" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookId" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "format" }, "value": { "kind": "StringValue", "value": "uuid", "block": false } }] }] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "reviewerName" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "reviewerLocation" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "LocationInput" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "minLength" }, "value": { "kind": "IntValue", "value": "10" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "maxLength" }, "value": { "kind": "IntValue", "value": "100" } }] }] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "content" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "rating" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "defaultValue": void 0, "directives": [{ "kind": "Directive", "name": { "kind": "Name", "value": "constraint" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "min" }, "value": { "kind": "IntValue", "value": "1" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "max" }, "value": { "kind": "IntValue", "value": "5" } }] }] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ReviewItem" } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "description": void 0, "name": { "kind": "Name", "value": "Query" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "authors" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "authorId" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "name" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "fromBornDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "toBornDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PaginatedAuthors" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "books" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookId" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "title" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "fromPublishedDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "toPublishedDate" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PaginatedBooks" } }, "directives": [] }, { "kind": "FieldDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookReviews" }, "arguments": [{ "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "bookId" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "page" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }, { "kind": "InputValueDefinition", "description": void 0, "name": { "kind": "Name", "value": "pageSize" }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "defaultValue": void 0, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "BookReview" } }, "directives": [] }] }], "loc": { "start": 0, "end": 2647 } };
var schema_default = documentNode;

// src/graphql/server.ts
var schema = (0, import_schema.makeExecutableSchema)({
  typeDefs: [import_graphql_constraint_directive.constraintDirectiveTypeDefs, schema_default],
  resolvers
});
schema = (0, import_graphql_constraint_directive.constraintDirective)()(schema);
var gqlServer = new import_server.ApolloServer({
  schema
});
var getDataLoaders = () => {
  const authorLoader = new import_dataloader.default(async (ids) => {
    authorLoader.clearAll();
    const authorMap = {};
    for (const id of ids) {
      const author = await authorService.getById(id);
      if (author) {
        authorMap[id] = author;
      } else {
        authorMap[id] = null;
      }
    }
    return ids.map((id) => authorMap[id]);
  });
  const bookLoader = new import_dataloader.default(async (ids) => {
    bookLoader.clearAll();
    const bookMap = {};
    for (const id of ids) {
      const book = await bookService.getById(id);
      if (book) {
        bookMap[id] = book;
      } else {
        bookMap[id] = null;
      }
    }
    return ids.map((id) => bookMap[id]);
  });
  return {
    authors: authorLoader,
    books: bookLoader
  };
};

// src/server.ts
var startBackendServer = async () => {
  const app = (0, import_express.default)();
  await establishSequelizeConnection();
  await establishMongoConnection();
  app.use(import_express.default.json());
  app.use(import_express.default.urlencoded({ extended: true }));
  app.use((0, import_cors.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use((0, import_helmet.default)());
  app.use("/api/health", (req, res, next) => {
    res.status(200);
    res.json({ message: "Server is healthy" });
  });
  await gqlServer.start();
  app.use(
    "/api/graphql",
    (0, import_express4.expressMiddleware)(gqlServer, {
      context: async ({ req, res }) => ({
        /* Creating new dataloader instance for each request */
        loaders: getDataLoaders()
      })
    })
  );
  return app;
};

// src/index.ts
import_dotenv2.default.config();
console.log(process.env);
var run = async () => {
  const app = await startBackendServer();
  const server = app.listen(env.PORT, () => {
    const { NODE_ENV, HOST, PORT } = env;
    logger_default.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  });
};
run();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

vary/index.js:
  (*!
   * vary
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
