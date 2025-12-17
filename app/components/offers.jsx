import { useState } from "react";
import ImageUploadWithPreview from "./fileUpload";

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

  addUpsellProductSections,
  addUpsellProductSection,
  removeUpsellProductSection,
  removeUpsellProduct,
  updateUpsellProductField,
  upsellProducts,
  discountUpsell,
  discountPerItem,
  upsellText,
  selectDefault,
  handleUpsellProduct,

  addGiftProductSections,
  addGiftProductSection,
  removeGiftProductSection,
  updateGiftProductField,
  giftProducts,
  textGift,
  selectDefaultGift,
  handleMyProduct,
  removeMyProduct,
  offerSection,
  updateOfferSectionField,
}) => {
  return (
    <s-stack gap="small-100">
      <s-stack gap="small-100">
        <s-stack direction="inline" justifyContent="space-between">
          <s-box InlineSize="250px">
            <s-text-field
              label="Titel"
              value={offerSection.titleOffer}
              onChange={(e) => {
                updateOfferSectionField(
                  e.target.value,
                  "titleOffer",
                  offerSection.id,
                );
              }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text-field
              label="Subtitle"
              details="This will be displayed as discount name!"
              value={offerSection.subtitleOffer}
              onChange={(e) => {
                updateOfferSectionField(
                  e.target.value,
                  "subtitleOffer",
                  offerSection.id,
                );
              }}
            />
          </s-box>
        </s-stack>
        <s-stack direction="inline" justifyContent="space-between">
          <s-box maxInlineSize="150px">
            <s-checkbox
              label="Default selected"
              checked={offerSection.defaultSelected}
              onChange={(e) => {
                updateOfferSectionField(
                  e.target.value,
                  "defaultSelected",
                  offerSection.id,
                );
              }}
            />
          </s-box>
          <s-stack direction="inline" gap="small-300">
            <s-box maxInlineSize="170px">
              <s-text-field
                label="Inside badge text"
                value={offerSection.insideBadgeText}
                onChange={(e) => {
                  updateOfferSectionField(
                    e.target.value,
                    "insideBadgeText",
                    offerSection.id,
                  );
                }}
              />
            </s-box>
            <s-box maxInlineSize="170px">
              <s-text-field
                label="Outside badge text"
                value={offerSection.outsideBadgeText}
                onChange={(e) => {
                  updateOfferSectionField(
                    e.target.value,
                    "outsideBadgeText",
                    offerSection.id,
                  );
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
            value={offerSection.discountType}
            onChange={(e) => {
              updateOfferSectionField(
                e.target.value,
                "discountType",
                offerSection.id,
              );
            }}
          >
            <s-option>Regular price</s-option>
            <s-option>Percentage</s-option>
            <s-option>Fixed amount</s-option>
          </s-select>
        </s-box>
        <s-box InlineSize="160px">
          <s-number-field
            value={offerSection.quantity}
            onChange={(e) => {
              updateOfferSectionField(
                e.target.value,
                "quantity",
                offerSection.id,
              );
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
          <ImageUploadWithPreview />
        </s-box>
        <s-stack gap="small-300">
          <s-box InlineSize="250px">
            <s-checkbox
              label="Display product image"
              checked={offerSection.displayProductImage}
              onChange={(e) => {
                updateOfferSectionField(
                  e.target.value,
                  "displayProductImage",
                  offerSection.id,
                );
              }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text>Size ({offerSection.imageSize}px)</s-text>
            <input
              value={offerSection.imageSize}
              onChange={(e) => {
                updateOfferSectionField(
                  e.target.value,
                  "imageSize",
                  offerSection.id,
                );
              }}
              type="range"
              min={0}
              max={100}
              step={1}
              style={{ width: "100%" }}
            />
          </s-box>
          <s-box InlineSize="250px">
            <s-text>Radius ({offerSection.imageBorderRadius}px)</s-text>
            <input
              value={offerSection.imageBorderRadius}
              onChange={(e) => {
                updateOfferSectionField(
                  e.target.value,
                  "imageBorderRadius",
                  offerSection.id,
                );
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
                  onClick={() => handleMyProduct(addGift.id)}
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
                          onClick={() => {
                            removeMyProduct(product.id, addGift.id);
                          }}
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
