import { CytoscapeJSON } from 'common';
import { callJsonApi } from 'helpers/api';

import React, { FC, useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

type Cytoscape = any;

async function expandNodes(cy: Cytoscape, nodeId: string) {
  const resss = await callJsonApi<CytoscapeJSON>(`/api/person/${nodeId}/cytoscape-links`);
  cy.add(resss);
}

const Cytoscape: FC<{ data: CytoscapeJSON }> = ({ data }) => {
  const myCyRef = useRef();

  const layoutOptions = {
    directed: true,
    fit: true,
    name: 'breadthfirst',
    padding: 10
  };

  useEffect(() => {
    if (!myCyRef.current) {
      return;
    }
    const cy = myCyRef.current as Cytoscape;
    cy.bind('click', 'node', async function (e) {
      const data = e.target.data();
      await expandNodes(cy, data.id);
      cy.layout(layoutOptions).run();
    });
  }, [myCyRef.current]);

  return (
    <CytoscapeComponent
      userZoomingEnabled={false}
      cy={cy => {
        myCyRef.current = cy;
      }}
      elements={data}
      style={{ height: '100%', width: '100%' }}
      layout={layoutOptions}
      stylesheet={[
        {
          selector: 'node',
          style: {
            height: 20,
            label: 'data(label)',
            width: 20
          }
        }
      ]}
    />
  );
};

export default Cytoscape;

/* cy.bind('dblclick', function (evt) {
 
  nid++;
});
 */
