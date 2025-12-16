import { useState } from "react";
import  ImageUploadWithPreview  from "./fileUpload"
export const Offers = ({
  titleOffer,
  onChangeTitleOffer,
  subtitleOffer,
  onChangeSubtitleOffer,
  defaultSelected,
  onChangeDefaultSelected,
  insideBadgeText,
  onChangeInsideBadgeText,
  outsideBadgeText,
  onChangeOutSideBadgeText,
  discountType,
  onChangeDiscountType,
  quantity,
  onChangeQuantity,
  displayProductImage,
  onChangeDisplayProductImage,
  imageSize,
  onChangeImageSize,
  imageBorderRadius,
  onChangeImageBorderRadius,
 
}) => {
  //////////////////////////////////////////////////////////
  const [addUpsellProductSections, setAddUpsellProductSections] = useState([]);
  const [upsellProducts, setUpsellProducts] = useState([]);
  const [discountUpsell, setDiscountUpsell] = useState();
  const [discountPerItem, setDiscountPerItem] = useState();
  const [upsellText, setUpsellText] = useState();
  const [selectDefault, setSelectDefault] = useState();

  const handleUpsellProduct = async (upsellSectionId) => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(upsellSectionId);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    setAddUpsellProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === upsellSectionId
          ? { ...section, UpsellProducts: selected }
          : section,
      ),
    );

    setUpsellProducts(selected);
  };

  const removeUpsellProduct = (productId, upsellSectionId) => {
    setAddUpsellProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === upsellSectionId
          ? {
              ...section,
              UpsellProducts: section.UpsellProducts.filter(
                (product) => product.id !== productId,
              ),
            }
          : section,
      ),
    );
  };

  const addUpsellProductSection = () => {
    const newUpsell = {
      id: Math.random(),
      discountUpsell,
      UpsellProducts: [],
      discountPerItem,
      upsellText: "+ Add at 20% discount",
      selectDefault,
    };
    setAddUpsellProductSections((prev) => [...prev, newUpsell]);
  };

  const removeUpsellProductSection = (id) => {
    setAddUpsellProductSections(
      addUpsellProductSections.filter((addProduct) => addProduct.id !== id),
    );
  };

  const updateUpsellProductField = (value, field, upsellSectionId) => {
    setAddUpsellProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === upsellSectionId
          ? { ...section, [field]: value }
          : section,
      ),
    );
  };

  //////////////////////////////////////////////////////////////////////

  const [addGiftProductSections, setAddGiftProductSections] = useState([]);
  const [giftProducts, setGiftProducts] = useState([]);
  const [textGift, setTextGift] = useState();
  const [selectDefaultGift, setSelectDefaultGift] = useState();

  const handleGiftProduct = async (giftSectionId) => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(giftSectionId);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    setAddGiftProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? { ...section, giftProducts: selected }
          : section,
      ),
    );

    setGiftProducts(selected);
  };

  const removeGiftProduct = (productId, giftSectionId) => {
    setAddGiftProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? {
              ...section,
              UpsellProducts: section.giftProducts.filter(
                (product) => product.id !== productId,
              ),
            }
          : section,
      ),
    );
  };

  const addGiftProductSection = () => {
    const newGift = {
      id: Math.random(),
      giftProducts: [],
      textGift: "Free Gift",
      selectDefaultGift,
    };
    setAddGiftProductSections((prev) => [...prev, newGift]);
  };

  const removeGiftProductSection = (id) => {
    setAddGiftProductSections(
      addGiftProductSections.filter((addGift) => addGift.id !== id),
    );
  };

  const updateGiftProductField = (value, field, giftSectionId) => {
    setAddGiftProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId ? { ...section, [field]: value } : section,
      ),
    );
  };
  //////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  return (
    <s-stack gap="small-100">
      <s-stack gap="small-100">
        <s-stack direction="inline" justifyContent="space-between">
          <s-box InlineSize="250px">
            <s-text-field
              label="Titel"
              value={titleOffer}
              onChange={(e) => {
                onChangeTitleOffer(e.target.value);
              }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text-field
              label="Subtitle"
              details="This will be displayed as discount name!"
              value={subtitleOffer}
              onChange={(e) => {
                onChangeSubtitleOffer(e.target.value);
              }}
            />
          </s-box>
        </s-stack>
        <s-stack direction="inline" justifyContent="space-between">
          <s-box maxInlineSize="150px">
            <s-checkbox
              label="Default selected"
              checked={defaultSelected}
              onChange={(e) => {
                onChangeDefaultSelected(e.target.value);
              }}
            />
          </s-box>
          <s-stack direction="inline" gap="small-300">
            <s-box maxInlineSize="170px">
              <s-text-field
                label="Inside badge text"
                value={insideBadgeText}
                onChange={(e) => {
                  onChangeInsideBadgeText(e.target.value);
                }}
              />
            </s-box>
            <s-box maxInlineSize="170px">
              <s-text-field
                label="Outside badge text"
                value={outsideBadgeText}
                onChange={(e) => {
                  onChangeOutSideBadgeText(e.target.value);
                }}
              />
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
          <s-select
            label="Discount type"
            value={discountType}
            onChange={(e) => {
              onChangeDiscountType(e.target.value);
            }}
          >
            <s-option>Regular price</s-option>
            <s-option>Percentage</s-option>
            <s-option>Fixed amount</s-option>
          </s-select>
        </s-box>
        <s-box InlineSize="160px">
          <s-number-field
            value={quantity}
            onChange={(e) => {
              onChangeQuantity(e.target.value);
            }}
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
         
          <ImageUploadWithPreview/>
        </s-box>
        <s-stack gap="small-300">
          <s-box InlineSize="250px">
            <s-checkbox label="Display product image"
            checked={displayProductImage}
            onChange={(e)=>{
              onChangeDisplayProductImage(e.target.value)
            }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text>Size ({imageSize}px)</s-text>
            <input
               value={imageSize}
               onChange={(e)=>{
                onChangeImageSize(e.target.value)
               }}
              type="range"
              min={0}
              max={100}
              step={1}
              style={{ width: "100%" }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text>Radius ({imageBorderRadius}px)</s-text>
            <input
             value={imageBorderRadius}
             onChange={(e)=>{
              onChangeImageBorderRadius(e.target.value)
             }}
              type="range"
              min={0}
              max={100}
              step={1}
              style={{ width: "100%" }}
            />
          </s-box>
        </s-stack>
      </s-stack>

      <s-stack>
        <s-stack direction="inline" gap="small-300">
          <s-button
            icon="product-add"
            onClick={() =>
              addUpsellProductSection(
                addUpsellProductSections.map((upsell) => upsell.id),
              )
            }
          >
            Add Upsell
          </s-button>

          <s-button icon="gift-card" onClick={() => addGiftProductSection()}>
            Add Free Gift
          </s-button>
        </s-stack>
        {addUpsellProductSections.map((upsell) => (
          <s-box border="base" padding="base" key={upsell.id}>
            <s-stack gap="base">
              <s-stack gap="base">
                <s-stack direction="inline" justifyContent="space-between">
                  <s-stack direction="inline" gap="small-300">
                    <s-icon type="product-add" />
                    <s-text>Add Upsell</s-text>
                  </s-stack>
                  <s-link onClick={() => removeUpsellProductSection(upsell.id)}>
                    Remove
                  </s-link>
                </s-stack>
                <s-button
                  icon="product-add"
                  onClick={() => handleUpsellProduct(upsell.id)}
                >
                  Select Product
                </s-button>
              </s-stack>

              {upsell.UpsellProducts && upsell.UpsellProducts.length > 0 && (
                <s-stack border="base" borderRadius="base" padding="base">
                  {upsell.UpsellProducts.map((product) => (
                    <s-stack
                      key={product.id}
                      direction="inline"
                      gap="base"
                      justifyContent="space-between"
                    >
                      <s-stack direction="inline" gap="base">
                        <s-box inlineSize="50px" blockSize="50px">
                          <s-image
                            src={
                              product.images && product.images[0]
                                ? product.images[0].originalSrc
                                : ""
                            }
                            alt={product.title}
                            aspectRatio="1/0.5"
                            objectFit="cover"
                          />
                        </s-box>
                        <s-box>
                          <s-text>{product.title}</s-text>
                          <s-paragraph>{product.publishedAt}</s-paragraph>
                        </s-box>
                      </s-stack>

                      <s-box>
                        <s-icon
                          type="x"
                          onClick={() =>
                            removeUpsellProduct(product.id, upsell.id)
                          }
                        />
                      </s-box>
                    </s-stack>
                  ))}
                </s-stack>
              )}

              <s-stack gap="small-100">
                <s-stack direction="inline" justifyContent="space-between">
                  <s-box inlineSize="230px">
                    <s-select
                      label="Discount type"
                      value={discountType}
                      onChange={(e) => {
                        updateUpsellProductField(
                          e.target.value,
                          "discountType",
                          upsell.id,
                        );
                      }}
                    >
                      <s-option>Percentage</s-option>
                      <s-option>Fixed amount</s-option>
                    </s-select>
                  </s-box>
                  <s-box inlineSize="230px">
                    <s-number-field
                      value={discountPerItem}
                      onChange={(e) => {
                        updateUpsellProductField(
                          e.target.value,
                          "discountPerItem",
                          upsell.id,
                        );
                      }}
                      label="Discount per item"
                      placeholder="0"
                      step={1}
                      min={0}
                      max={100}
                    />
                  </s-box>
                </s-stack>
                <s-text-field
                  label="Text"
                  value={upsell.upsellText}
                  onChange={(e) => {
                    updateUpsellProductField(
                      e.target.value,
                      "upsellText",
                      upsell.id,
                    );
                  }}
                />
                <s-checkbox
                  label="Selected by default"
                  checked={defaultSelected}
                  onChange={(e) => {
                    updateUpsellProductField(
                      e.target.value,
                      "defaultSelected",
                      upsell.id,
                    );
                  }}
                />
              </s-stack>
            </s-stack>
          </s-box>
        ))}

        {addGiftProductSections.map((addGift) => (
          <s-box border="base" padding="base" key={addGift.id}>
            <s-stack gap="small-300">
              <s-stack gap="base">
                <s-stack direction="inline" justifyContent="space-between">
                  <s-stack direction="inline" gap="small-300">
                    <s-icon type="gift-card" />
                    <s-text>Free Gift</s-text>
                  </s-stack>
                  <s-link onClick={() => removeGiftProductSection(addGift.id)}>
                    Remove
                  </s-link>
                </s-stack>
                <s-button
                  icon="product-add"
                  onClick={() => handleGiftProduct(addGift.id)}
                >
                  Select Product
                </s-button>
              </s-stack>

              {addGift.giftProducts && addGift.giftProducts.length > 0 && (
                <s-stack border="base" borderRadius="base" padding="base">
                  {addGift.giftProducts.map((product) => (
                    <s-stack
                      key={product.id}
                      direction="inline"
                      gap="base"
                      justifyContent="space-between"
                    >
                      <s-stack direction="inline" gap="base">
                        <s-box inlineSize="50px" blockSize="50px">
                          <s-image
                            src={
                              product.images && product.images[0]
                                ? product.images[0].originalSrc
                                : ""
                            }
                            alt={product.title}
                            aspectRatio="1/0.5"
                            objectFit="cover"
                          />
                        </s-box>
                        <s-box>
                          <s-text>{product.title}</s-text>
                          <s-paragraph>{product.publishedAt}</s-paragraph>
                        </s-box>
                      </s-stack>

                      <s-box>
                        <s-icon
                          type="x"
                          onClick={() =>
                            removeGiftProduct(product.id, addGift.id)
                          }
                        />
                      </s-box>
                    </s-stack>
                  ))}
                </s-stack>
              )}

              <s-text-field
                label="Text"
                value={addGift.textGift}
                onChange={(e) => {
                  updateGiftProductField(
                    e.target.value,
                    "textGift",
                    addGift.id,
                  );
                }}
              />
              <s-checkbox
                label="Selected by default"
                checked={addGift.selectDefaultGift}
                onChange={(e) => {
                  updateGiftProductField(
                    e.target.value,
                    "selectedDefaultGift",
                    addGift.id,
                  );
                }}
              />
            </s-stack>
          </s-box>
        ))}
      </s-stack>
    </s-stack>
  );
};
