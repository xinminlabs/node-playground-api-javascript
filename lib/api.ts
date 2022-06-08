import ts from "typescript";
import NodeQuery from "@xinminlabs/node-query";

import type { Position, Range } from "./types";
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

export const parseNql = (nql: string, source: string, path: string = "code.ts"): Range[] => {
  const node = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
  const nodeQuery = new NodeQuery<ts.Node>(nql);
  const matchingNodes = nodeQuery.parse(node);
  return matchingNodes.map((matchingNode) => {
    const start = matchingNode.getStart()
    const end = matchingNode.getEnd()
    return { start: parsePosition(source, start), end: parsePosition(source, end) };
  });
}

const parsePosition = (source: string, position: number): Position => {
  const strs = source.substring(0, position).split("\n");
  const line = strs.length;
  const column = strs[strs.length - 1].length;
  return { line, column };
}