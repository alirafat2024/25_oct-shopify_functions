import EditBundlePage from "../components/editeBundlePage";
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

  // Form data extraction
  const name = formData.get("name");
  const data = JSON.parse(formData.get("data"));
  const actionType = formData.get("type");
  const createAt = formData.get("create_at");
  const metaobjectId = formData.get("metaobjectId");
  const productID =
    data.resource && data.resource.length > 0
      ? data.resource.map((product) => product.id)
      : [];
  const productIds = productID[0];
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");
  console.log("Product IDs:", productIds);
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  console.log(name);
  console.log(data);
  console.log(actionType);
  console.log(createAt);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  const fieldsArr = [
    { key: "name", value: name },
    { key: "data", value: JSON.stringify(data) },
    { key: "created_at", value: new Date().toISOString() },
  ].filter((f) => f.value !== undefined && f.value !== null);

  if (actionType === "update" && metaobjectId) {
    const updateResponse = await admin.graphql(
      `#graphql
      mutation {
        metaobjectUpdate(id: "${metaobjectId}", metaobject: {
          fields: [
            ${fieldsArr.map((f) => `{ key: "${f.key}", value: """${f.value}""" }`).join(",\n")}
          ]
        }) {
          metaobject {
            id
            type
            fields { key value }
          }
          userErrors { field message code }
        }
      }`,
    );
    const updateData = await updateResponse.json();
    if (updateData.data.metaobjectUpdate.userErrors.length > 0) {
      return { errors: updateData.data.metaobjectUpdate.userErrors };
    }
    return { metaobject: updateData.data.metaobjectUpdate.metaobject };
  }

  return { error: "Invalid action type or missing metaobjectId" };
};

export default function EditBundlesPage() {
  return <EditBundlePage />;
}
