import React from 'react';
import styled from 'styled-components';

const JsonTree = styled.tbody`
  display: block;
  width: 95vw;
`;

const JsonContainer = styled.div`
  background-color: #1b1c1d;
  border: 1px solid #000000;
  color: white;
`;

enum JsonNodeType {
  OBJECT = 'Object',
  ARRAY = 'Array',
  VALUE = 'Value'
}

interface EvaluatedNode {
  path: string
  type: JsonNodeType
  key?: string
  value?: string
  children?: EvaluatedNode[]
  patch?: any
}

const pathDepth = (path: string): number => {
  return path.split('/').length - 1;
};

const evaluateNode = (node: any, patchMap: Map<string, any>, currPath: string, key?: string): EvaluatedNode => {
  if (Array.isArray(node)) {
    return {
      key: key ? key : 'array',
      path: currPath,
      patch: patchMap.get(currPath),
      type: JsonNodeType.ARRAY,
      children: node.map((n, i) => evaluateNode(n, patchMap, `${currPath}/${i}`, i.toString())),
    };
  } else if (typeof node == 'object' && node != null) {
    return {
      key: key ? key : 'object',
      path: currPath,
      patch: patchMap.get(currPath),
      type: JsonNodeType.OBJECT,
      children: Object.keys(node).map((k) => evaluateNode(node[k], patchMap, `${currPath}/${k}`, k)),
    };
  }

  return {
    key,
    path: currPath,
    patch: patchMap.get(currPath),
    type: JsonNodeType.VALUE,
    value: node as string,
  };
};

const drawArray = (node: EvaluatedNode): JSX.Element[] => {
  const {
    children,
    key,
    path,
    patch,
  } = node;

  return [
    <tr key={path}>
      <td>
        <table style={{marginLeft: `${pathDepth(path)}vw`}}>
          <tbody>
            <tr key={path}>
              <td>
                {`${key} {${children?.length}} ${path} --${path} ++${JSON.stringify(patch)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>,
  ].concat(children!!.flatMap((n) => drawJsonTree(n)));
};

const drawObject = (node: EvaluatedNode): JSX.Element[] => {
  const {
    children,
    key,
    path,
    patch,
  } = node;

  return [
    <tr key={path}>
      <td>
        <table style={{marginLeft: `${pathDepth(path)}vw`}}>
          <tbody>
            <tr key={path}>
              <td>
                {`${key} {${children?.length}} ${path} --${path} ++${JSON.stringify(patch)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>,
  ].concat(children!!.flatMap((n) => drawJsonTree(n)));
};

const drawValue = (node: EvaluatedNode): JSX.Element[] => {
  const {
    value,
    key,
    path,
    patch,
  } = node;

  return [
    <tr key={path}>
      <td>
        <table style={{marginLeft: `${pathDepth(path)}vw`}}>
          <tbody>
            <tr key={path}>
              <td>
                {`${key ? key + ':' : ''} ${value ? value : 'null'} --${path} ++${JSON.stringify(patch)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>,
  ];
};

const drawJsonTree = (node: EvaluatedNode) => {
  switch (node.type) {
    case JsonNodeType.ARRAY: return drawArray(node);
    case JsonNodeType.OBJECT: return drawObject(node);
    case JsonNodeType.VALUE: return drawValue(node);
  }
};

const buildPatchMap = (patchNodes: any): Map<string, any> => {
  const map = new Map<string, any>();

  if (patchNodes) {
    for (let i = 0; i < patchNodes.length; i++) {
      const node = patchNodes[i];
      map.set(node.path, node);
    }
  }

  return map;
};

export const JsonViewer = (props: {
  json: any
  patch?: any
}) => {
  const {json, patch} = props;

  const map = buildPatchMap(patch);

  const evaluatedNode = evaluateNode(json, map, '', '');

  return <JsonContainer>
    <table>
      <JsonTree>
        {drawJsonTree(evaluatedNode)}
      </JsonTree>
    </table>
  </JsonContainer>;
};
