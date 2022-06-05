import ts from "typescript";
import NodeQuery from "@xinminlabs/node-query";

import { SyntaxError } from "./error";

export const generateAst = (source: string): ts.Node => {
  const node = generateNode(source);
  const program = ts.createProgram(['code.ts'], {});
  const diagnotics = program.getSyntacticDiagnostics(node);
  if (diagnotics.length > 0) {
    throw new SyntaxError(diagnotics[0].messageText.toString());
  }
  return node
}

export const parseNql = (nql: string, source: string): ts.Node[] => {
  const nodeQuery = new NodeQuery<ts.Node>(nql);
  const node = generateNode(source);
  return nodeQuery.parse(node);
}

const generateNode = (source: string): ts.SourceFile => {
  return ts.createSourceFile("code.ts", source, ts.ScriptTarget.Latest, false);
}
