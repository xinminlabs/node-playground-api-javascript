import ts from "typescript";

import { SyntaxError } from "./error";

export const generateAst = (source: string): ts.Node => {
  const node = ts.createSourceFile("code.js", source, ts.ScriptTarget.Latest, false);
  const program = ts.createProgram(['code.js'], {});
  const diagnotics = program.getSyntacticDiagnostics(node);
  if (diagnotics.length > 0) {
    throw new SyntaxError(diagnotics[0].messageText.toString());
  }
  return node
}