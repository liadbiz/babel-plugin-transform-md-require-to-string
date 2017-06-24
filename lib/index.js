Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = md_to_string;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}

function md_to_string(_ref) {
  var t = _ref.types;

  return {
    visitor: {
      CallExpression: function () {
        function CallExpression(path, state) {
          if (path.node.callee.type === "Identifier" && path.node.callee.name === "require") {
            var filePath = path.node.arguments[0];
            if (endsWith(filePath.value, "md")) {
              var dir = _path2['default'].dirname(_path2['default'].resolve(state.file.opts.filename));
              var absolutePath = _path2['default'].resolve(dir, filePath.value);
              var mdContent = _fs2['default'].readFileSync(absolutePath, "utf8");

              path.replaceWith(t.stringLiteral(mdContent));
            }
          }
        }

        return CallExpression;
      }()
    }
  };
}