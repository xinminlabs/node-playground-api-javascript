import ts from "typescript";
import NodeQuery from "@xinminlabs/node-query";

import { SyntaxError } from "./error";

export const generateAst = (source: string, path: string = "code.ts"): ts.Node => {
  const node = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, false);
  const program = ts.createProgram([path], {});
  const diagnotics = program.getSyntacticDiagnostics(node);
  if (diagnotics.length > 0) {
    throw new SyntaxError(diagnotics[0].messageText.toString());
  }
  return node
}

export const parseNql = (nql: string, source: string, path: string = "code.ts"): ts.Node[] => {
  const node = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
  const nodeQuery = new NodeQuery<ts.Node>(nql);
  return nodeQuery.parse(node);
}