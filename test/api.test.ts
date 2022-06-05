import { generateAst, parseNql } from '../lib/api';
import { SyntaxError } from '../lib/error';

describe("genereteAst", () => {
  it("gets node from source code", () => {
    const code = "class Synvert {}";
    const node = generateAst(code)
    expect(node).not.toBeNull();
  });

  it("raises error if source code is invalid", () => {
    const code = "class Synvert }";
    expect(() => { generateAst(code) }).toThrow(SyntaxError);
  });

  it("gets jsx node from source code", () => {
    const code = `
      class Test extends Component {
        render() {
          return <Button />
        }
      }
    `
    const node = generateAst(code)
    expect(node).not.toBeNull();
  });
});

describe("parseNql", () => {
  it("gets node from nql", () => {
    const nql = ".ClassDeclaration";
    const code = "class Synvert {}";
    const nodes = parseNql(nql, code)
    expect(nodes.length).toBe(1);
  });
});