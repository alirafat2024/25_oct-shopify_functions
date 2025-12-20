import BundleView from "../components/bundleView";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      mutation CreateBundleMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
        metaobjectDefinitionCreate(definition: $definition) {
          metaobjectDefinition {
            id
            name
            type
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `,
    {
      variables: {
        definition: {
          name: "bundle_definition1",
          type: "bundle_definition1",
          fieldDefinitions: [
            { name: "Name", key: "name", type: "single_line_text_field" },
            { name: "Data", key: "data", type: "json" },
            { name: "CreatedAt", key: "created_at", type: "date_time" },
          ],
        },
      },
    },
  );

  const data = await response.json();
  const payload = data?.data?.metaobjectDefinitionCreate;
  const userErrors = payload?.userErrors ?? [];

  if (userErrors.length > 0) {
    const alreadyExists = userErrors.some((e) => e.code === "ALREADY_EXISTS");

    if (!alreadyExists) {
      return { errors: userErrors };
    }
  }

  const metaobjectDefinition = payload?.metaobjectDefinition ?? null;
  const metaobjectDefinitionId = metaobjectDefinition?.id;

  let metafieldDefinition = null;
  let metafieldErrors = [];

  if (metaobjectDefinitionId) {
    const metafieldResponse = await admin.graphql(
      `#graphql
    mutation CreateBundleOfferMetafieldDefinition(
      $definition: MetafieldDefinitionInput!
    ) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition {
          id
          name
          namespace
          key
        }
        userErrors {
          field
          message
          code
        }
      }
    }
   `,
      {
        variables: {
          definition: {
            name: "Bundle",
            namespace: "custom",
            key: "bundle",
            description: "bundle metaobject related",
            type: "metaobject_reference",
            ownerType: "PRODUCT",

            validations: [
              {
                name: "metaobject_definition_id",
                value: metaobjectDefinitionId,
              },
            ],
          },
        },
      },
    );

    const metafieldJson = await metafieldResponse.json();
    const metafieldPayload =
      metafieldJson?.data?.metafieldDefinitionCreate ?? null;
    metafieldErrors = metafieldPayload?.userErrors ?? [];
    metafieldDefinition = metafieldPayload?.createdDefinition ?? null;
  }

  return {
    metaobjectDefinition,
    metafieldDefinition,
    errors: [...userErrors, ...metafieldErrors],
  };
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const formData = await request.formData();

  const name = formData.get("name");
  const data = formData.get("data");
  const createdAt = formData.get("create_at");
  const metaobjectId = formData.get("metaobjectId");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(name);
  console.log(createdAt);
  console.log(data);
  console.log(metaobjectId);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // CREATE

  const createResponse = await admin.graphql(
    `#graphql
      mutation {
        metaobjectCreate(metaobject: {
          type: "bundle_definition1",
             fields: [
             { key: "name", value: "${name}" },
            { key: "data", value: "${data}" },
            { key: "created_at", value: "${createdAt}" },

          ],
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
  const createData = await createResponse.json();
  if (createData.data.metaobjectCreate.userErrors.length > 0) {
    return { errors: createData.data.metaobjectCreate.userErrors };
  }
  return { metaobject: createData.data.metaobjectCreate.metaobject };
};
export default function BundleViewPage() {
  return <BundleView />;
}
