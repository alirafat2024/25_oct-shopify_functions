import AppIndexView from "../components/appIndexView";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const getResponse = await admin.graphql(
    `#graphql
    query {
      metaobjects(type: "MyBundle", first: 50) {
        edges {
          node {
            id
            fields {
              key
              value
            }
          }
        }
      }
    }`,
  );

  const getData = await getResponse.json();

  const safeJsonParse = (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  const data = getData.data.metaobjects.edges.map((edge) => {
    const node = edge.node;

    const parsedData = node.fields.reduce((acc, { key, value }) => {
      acc[key] = value ? safeJsonParse(value) : null;
      return acc;
    }, {});

    return {
      id: node.id,
      data: parsedData,
    };
  });

  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  console.log(data);
  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

  return {
    data,
  };
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const actionType = formData.get("type");
  const metaobjectId = formData.get("metaobjectId");

  if (actionType === "delete" && metaobjectId) {
    const deleteResponse = await admin.graphql(
      `#graphql
      mutation {
        metaobjectDelete(id: "${metaobjectId}") {
          deletedId
          userErrors { field message code }
        }
      }`,
    );
    const deleteData = await deleteResponse.json();
    if (deleteData.data.metaobjectDelete.userErrors.length > 0) {
      return { errors: deleteData.data.metaobjectDelete.userErrors };
    }
    return {
      deletedMetaobjectId: deleteData.data.metaobjectDelete.deletedId,
    };
  }

  return { error: "Invalid action type or missing metaobjectId" };
};

export default function Index() {
  return <AppIndexView />;
}
