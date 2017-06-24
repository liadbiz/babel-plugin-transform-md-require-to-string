import fs from 'fs';
import p from 'path';
function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}

export default function md_to_string({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state){
        if (path.node.callee.type === "Identifier" && path.node.callee.name === "require") {
         const filePath = path.node.arguments[0];
         if (endsWith(filePath.value, "md")) {
           const dir = p.dirname(p.resolve(state.file.opts.filename)); 
           const absolutePath = p.resolve(dir, filePath.value);
           const mdContent = fs.readFileSync(absolutePath, "utf8");

           path.replaceWith(t.stringLiteral(mdContent));
         }
        }
      }
    }
  };
}