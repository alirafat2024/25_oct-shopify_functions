import { useState } from "react";

export const Offers = () => {
  const [addProductSections, setAddProductSections] = useState([]);
  const [addGiftSections, setAddGiftSections] = useState([]);

  const addGiftSection = () => {
    const newGift = { id: Math.random() };
    setAddGiftSections([...addGiftSections, newGift]);
  };

  const removeGiftSection = (id) => {
    setAddGiftSections(addGiftSections.filter((addGift) => addGift.id !== id));
  };

  const addProductSection = () => {
    const newProduc = { id: Math.random() };
    setAddProductSections([...addProductSections, newProduc]);
  };

  const removeProductSection = (id) => {
    setAddProductSections(
      addProductSections.filter((addProduct) => addProduct.id !== id),
    );
  };
  return (
    <s-stack gap="small-100">
      <s-stack gap="small-100">
        <s-stack direction="inline" justifyContent="space-between">
          <s-box InlineSize="250px">
            <s-text-field label="Titel" />
          </s-box>
          <s-box InlineSize="250px">
            <s-text-field
              label="Subtitle"
              details="This will be displayed as discount name!"
            />
          </s-box>
        </s-stack>
        <s-stack direction="inline" justifyContent="space-between">
          <s-box maxInlineSize="150px">
            <s-checkbox label="Default selected" />
          </s-box>
          <s-stack direction="inline" gap="small-300">
            <s-box maxInlineSize="170px">
              <s-text-field label="Inside badge text" />
            </s-box>
            <s-box maxInlineSize="170px">
              <s-text-field label="Outside badge text" />
            </s-box>
          </s-stack>
        </s-stack>
        <s-divider />
      </s-stack>

      <s-stack>
        <s-banner tone="warning">
          You have selected Regular price as the discount type. This means that
          the bundle will not be discounted.
        </s-banner>
      </s-stack>
      <s-stack direction="inline" justifyContent="space-between">
        <s-box InlineSize="160px">
          <s-select label="Discount type">
            <s-option>Regular price</s-option>
            <s-option>Percentage</s-option>
            <s-option>Fixed amount</s-option>
          </s-select>
        </s-box>
        <s-box InlineSize="160px">
          <s-number-field
            label="Quantity"
            placeholder="0"
            step={1}
            min={0}
            max={100}
          />
        </s-box>
        <s-box InlineSize="160px">
          <s-number-field
            label="Discount per item"
            disabled
            placeholder="0"
            step={1}
            min={0}
            max={100}
          />
        </s-box>
      </s-stack>
      <s-stack direction="inline" justifyContent="space-between">
        <s-box inlineSize="250px">
          <s-drop-zone
            accessibilityLabel="Upload image of type jpg, png, or gif"
            multiple
            onInput={(event) =>
              console.log("onInput", event.currentTarget?.value)
            }
            onChange={(event) =>
              console.log("onChange", event.currentTarget?.value)
            }
            onDropRejected={(event) =>
              console.log("onDropRejected", event.currentTarget?.value)
            }
          />
        </s-box>
        <s-stack gap="small-300">
          <s-box InlineSize="250px">
            <s-checkbox label="Display product image" />
          </s-box>
          <s-box InlineSize="250px">
            <s-text>Size (41px)</s-text>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              style={{ width: "100%" }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text>Radius (4px)</s-text>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              style={{ width: "100%" }}
            />
          </s-box>
        </s-stack>
      </s-stack>
      <s-stack direction="inline" gap="small-300">
        <s-button icon="product-add" onClick={addProductSection}>
          Add Upsell
        </s-button>
        <s-button icon="gift-card" onClick={addGiftSection}>
          Add Free Gift
        </s-button>
      </s-stack>
      {addProductSections.map((addProduct) => (
        <s-box border="base" padding="base" key={addProduct.id}>
          <s-stack gap="base">
            <s-stack gap="base">
              <s-stack direction="inline" justifyContent="space-between">
                <s-stack direction="inline" gap="small-300">
                  <s-icon type="product-add" />
                  <s-text>Add Upsell</s-text>
                </s-stack>
                <s-link onClick={() => removeProductSection(addProduct.id)}>
                  Remove
                </s-link>
              </s-stack>
              <s-button icon="product-add">Select Product</s-button>
            </s-stack>
            <s-stack gap="small-100">
              <s-stack direction="inline" justifyContent="space-between">
                <s-box inlineSize="230px">
                  <s-select label="Discount type">
                    <s-option>Percentage</s-option>
                    <s-option>Fixed amount</s-option>
                  </s-select>
                </s-box>
                <s-box inlineSize="230px">
                  <s-number-field
                    label="Discount per item"
                    placeholder="0"
                    step={1}
                    min={0}
                    max={100}
                  />
                </s-box>
              </s-stack>
              <s-text-field label="Text" value="+ Add at 20% discount" />
              <s-checkbox label="Selected by default" />
            </s-stack>
          </s-stack>
        </s-box>
      ))}
      {addGiftSections.map((addGift) => (
        <s-box border="base" padding="base" key={addGift.id}>
          <s-stack gap="small-300">
            <s-stack gap="base">
              <s-stack direction="inline" justifyContent="space-between">
                <s-stack direction="inline" gap="small-300">
                  <s-icon type="gift-card" />
                  <s-text>Free Gift</s-text>
                </s-stack>
                <s-link onClick={() => removeGiftSection(addGift.id)}>
                  Remove
                </s-link>
              </s-stack>
              <s-button icon="product-add">Select Product</s-button>
            </s-stack>

            <s-text-field label="Text" value="Free Gift" />
            <s-checkbox label="Selected by default" />
          </s-stack>
        </s-box>
      ))}
    </s-stack>
  );
};
