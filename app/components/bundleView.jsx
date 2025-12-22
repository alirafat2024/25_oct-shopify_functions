import { useState, useEffect } from "react";
import { ColorPickerField } from "./ColorPickerField";
import { SelectField } from "./selectField";
import { Offers } from "./offers";
import { FiBox } from "react-icons/fi";
import { useFetcher, useLoaderData,useParams} from "react-router";
import { Form } from "react-router";

export default function BundleView() {
  const fetcher = useFetcher();
  

  //////////Progressive Gifts/////////////////

  const [giftSections, setGiftSections] = useState([]);
  const [textField1, setTextField1] = useState("🎁 Free gifts with your order");
  const [textField2, setTextField2] = useState(
    "Unlock selecting a higher bundle",
  );
  const [switchState, setSwitchState] = useState(false);

  const [giftTitle, setGiftTitle] = useState();
  const [giftPrice, setGiftPrice] = useState("$10.00");
  const [giftType, setGiftType] = useState("FREE");
  const [giftLock, setGiftLock] = useState("Lock");
  const [selectedGiftImage, setSelectedGiftImage] = useState("horizontal");
  const [selectedGiftProducts, setSelectedGiftProducts] = useState([]);

  const handleGiftImageSelect = (image) => {
    setSelectedGiftImage(image);
  };

  const handleSwitchChange = () => {
    setSwitchState(!switchState);
  };

  const handlePro = async (giftSectionId) => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });

    const newGiftTitle = selected.length > 0 ? selected[0].title : "";
    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? { ...section, giftProducts: selected, giftTitle: newGiftTitle }
          : section,
      ),
    );

    setSelectedGiftProducts(selected);
  };

  const deletePro = (productId, giftSectionId) => {
    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? {
              ...section,
              giftProducts: section.giftProducts.filter(
                (product) => product.id !== productId,
              ),
            }
          : section,
      ),
    );
    setGiftTitle("");
  };

  const addGiftSection = async () => {
    const newOfferNumber = (giftSections.length % 3) + 1;
    const newGift = {
      id: Math.random(),
      giftType: "FREE",
      giftPrice: "$10.00",
      giftTitle: giftTitle || "{{Title}}",
      giftLock: "Lock",
      giftProducts: [],
      giftOffer: newOfferNumber.toString(),
    };

    setGiftSections([...giftSections, newGift]);
  };

  const removeGiftSection = (id) => {
    setGiftSections(giftSections.filter((gift) => gift.id !== id));
  };

  const updateGiftSectionField = (value, field, giftSectionId) => {
    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId ? { ...section, [field]: value } : section,
      ),
    );
  };

  const handleOfferChange = (e, giftSectionId) => {
    const selectedOffer = e.target.value;

    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? { ...section, giftOffer: selectedOffer }
          : section,
      ),
    );
  };

  const offerOptions = [
    { value: "1", label: "Offer1" },
    { value: "2", label: "Offer2" },
    { value: "3", label: "Offer3" },
  ];

  //////////////////////////////////////////
  // Style
  const [titleColor, setTitleColor] = useState("#000000");
  const [lineleColor, setLineColor] = useState("#AAF0FB");
  const [cardBgColor, setCardBgColor] = useState("#FFFFFF");
  const [selectedCardBgColor, setSelectedCardBgColor] = useState("#AAF0FB");
  const [cardTitleColor, setCardTitleColor] = useState("#000000");
  const [cardSubtitleColor, setCardSubtitleColor] = useState("#7E5050");
  const [priceColor, setPriceColor] = useState("#000000");
  const [comparePriceColor, setComparePriceColor] = useState("#808080");
  const [borderColor, setBorderColor] = useState("#CCCCCC");
  const [atcButtonText, setAtcButtonText] = useState("Add To Card");
  //  Inside Badge Colors
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  ///////////////button//////////////////

  const [atcButtonBackgroundColor, setAtcButtonBackgroundColor] =
    useState("#000000");
  const [atcButtonTextColor, setAtcButtonTextColor] = useState("#FFFFFF");
  const [paddingButton, setPaddingButton] = useState(10);
  const [borderRadiusButton, setBorderRadiusButton] = useState(10);
  ///////////////////////////////////////////////
  //  Outside Badge Colors
  const [outsideTextColor, setOutsideTextColor] = useState("#747474");
  const [outsideBackgroundColor, setOutsideBackgroundColor] =
    useState("#FFF100");
  const [upsellBackgroundColor, setUpsellBackgroundColor] = useState("#E5E7EB");
  ////////////////////////////////////////////////////////////////////////////
  const [fontSettings, setFontSettings] = useState({
    mainTitle: { fontSize: 24, fontStyle: "700" },
    cardTitle: { fontSize: 19.2, fontStyle: "500" },
    cardSubtitle: { fontSize: 16, fontStyle: "400" },
    insideBadge: { fontSize: 14, fontStyle: "400" },
    outsideBadge: { fontSize: 14, fontStyle: "400" },
    atcButton: { fontSize: 16, fontStyle: "400" },
  });

  const handleFontSizeChange = (field, value) => {
    setFontSettings((prevSettings) => ({
      ...prevSettings,
      [field]: { ...prevSettings[field], fontSize: value },
    }));
  };

  const handleFontStyleChange = (field, value) => {
    const [fontWeight, italic] = value.split("-");

    setFontSettings((prevSettings) => ({
      ...prevSettings,
      [field]: {
        ...prevSettings[field],
        fontStyle: fontWeight,
        italic: italic || "",
      },
    }));
  };

  ///////////////////////////////////////////////////////

  const loaderData = useLoaderData();
const { bundleId } = useParams(); 
  const [devBorder, setDevBorder] = useState(5);
  const [selectedImage, setSelectedImage] = useState("horizontal");
  const [activeIndex, setActiveIndex] = useState([]);

  const [showVariantSelection, setShowVariantSelection] = useState(false);
  const [showVariantImag, setShowVariantImg] = useState(false);
  const [variantImagSizeValue, setVariantImagSizeValue] = useState(2);
  const [variantImagRadiusValue, setVariantImagRadiusValue] = useState(2);
  const [comparePrice, setComparePrice] = useState(false);
  const [products, setProducts] = useState([]);
  const [bundleName, setBundleName] = useState();
  const [title, setTitle] = useState("Bundle & Save");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleProduct = async () => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });
    setProducts(selected);
  };
  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  const handleComparePrice = () => {
    setComparePrice(!comparePrice);
  };

  const handleVariantCheckboxChange = () => {
    setShowVariantSelection(!showVariantSelection);
  };

  const handleShowVariantImg = () => {
    setShowVariantImg(!showVariantImag);
  };
  ///////////////////////////////////////////////
  const formatFullDate = (date) => {
    const d = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  };

  /////////////////handle submit///////////////////////////////

  const handleSubmit = async () => {
    const createAt = formatFullDate(new Date());

    const data = {
      name: bundleName,
      title: title,
      resource: products,
    };

    if (
      !data.name ||
      !data.title ||
      !data.resource ||
      data.resource.length === 0
    ) {
      console.error("Form is incomplete. Missing required data.");
      return;
    }

    try {
      await fetcher.submit(
        {
          name: bundleName,
          data: JSON.stringify(data),
          create_at: createAt,
          type: "create",
        },
        { method: "POST" },
      );

      setBundleName("");
      setTitle("");
      setProducts([]);
      setSuccessMessage("Data submitted successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  /////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  const [offerSections, setOfferSections] = useState([]);
  const [titleOffer, setTitleOffer] = useState("");
  const [subtitleOffer, setSubtitleOffer] = useState("");
  const [defaultSelected, setDefaultSelected] = useState(false);
  const [insideBadgeText, setInsideBadgeText] = useState("");
  const [outsideBadgeText, setOutsideBadgeText] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [displayProductImage, setDisplayProductImage] = useState(false);
  const [imageSize, setImageSize] = useState("");
  const [imageBorderRadius, setImageBorderRadius] = useState(10);
  const [chooseDefault, setChooseDefault] = useState(false);

  const addOfferSection = () => {
    const newOffer = {
      id: Math.random(),
      titleOffer: "Buy 1",
      subtitleOffer: "5% OFF",
      defaultSelected,
      insideBadgeText: "Best Offer",
      outsideBadgeText: "Best Seller",
      discountType,
      quantity,
      displayProductImage,
      imageSize,
      imageBorderRadius,
      upsellProductdd: [],
      giftProductsd: [],
    };
    setOfferSections([...offerSections, newOffer]);
  };

  const removeOfferSection = (id) => {
    setOfferSections(
      offerSections.filter((addSection) => addSection.id !== id),
    );
  };

  const handleToggle = (index) => {
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index));
    } else {
      setActiveIndex([...activeIndex, index]);
    }
  };
  const updateOfferSectionField = (value, field, offerSectionId) => {
    setOfferSections((prevSections) =>
      prevSections.map((section) =>
        section.id === offerSectionId
          ? { ...section, [field]: value } // Update specific field of the section
          : section,
      ),
    );
  };

  //////////////////////////////////////////////////////////

  const [addUpsellProductSections, setAddUpsellProductSections] = useState([]);
  const [discountUpsell, setDiscountUpsell] = useState();
  const [discountPerItem, setDiscountPerItem] = useState();
  const [upsellText, setUpsellText] = useState();
  const [selectDefault, setSelectDefault] = useState();

  const handleUpsellProduct = async (upsellSectionId, offerSectionId) => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });

    setAddUpsellProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === upsellSectionId
          ? { ...section, UpsellProducts: selected }
          : section,
      ),
    );

    setOfferSections((prevSections) =>
      prevSections.map((section) =>
        section.id === offerSectionId
          ? { ...section, upsellProductdd: selected }
          : section,
      ),
    );
  };

  const removeUpsellProduct = (productId, upsellSectionId, offerSectionId) => {
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

    setOfferSections((prevSections) =>
      prevSections.map((section) =>
        section.id === offerSectionId
          ? {
              ...section,
              upsellProductdd: section.upsellProductdd.filter(
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

  const [textGift, setTextGift] = useState();
  const [selectDefaultGift, setSelectDefaultGift] = useState();

  const handleMyProduct = async (giftSectionId, offerSectionId) => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });

    setAddGiftProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? { ...section, giftProducts: selected }
          : section,
      ),
    );
    setOfferSections((prevSections) =>
      prevSections.map((section) =>
        section.id === offerSectionId
          ? { ...section, giftProductsd: selected }
          : section,
      ),
    );
  };

  const removeMyProduct = (productId, giftSectionId, offerSectionId) => {
    setAddGiftProductSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? {
              ...section,
              giftProducts: section.giftProducts.filter(
                (product) => product.id !== productId,
              ),
            }
          : section,
      ),
    );
    setOfferSections((prevSections) =>
      prevSections.map((section) =>
        section.id === offerSectionId
          ? {
              ...section,
              giftProductsd: section.giftProductsd.filter(
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

  return (
    <s-page>
      <s-stack direction="block" gap="base">
        <Form
          data-save-bar
          onSubmit={handleSubmit}
          onReset="handleDiscord(event)"
        >
          <s-box>
            <s-stack
              direction="inline"
              gap="base"
              justifyContent="start"
              alignItems="center"
            >
              <s-box>
                <s-clickable
                  background="transparent"
                  href="/app"
                  borderRadius="small-300"
                >
                  <s-icon type="arrow-left" />
                </s-clickable>
              </s-box>

              <s-stack direction="inline" gap="small-300" alignItems="center">
                <h2> Bundle</h2>
                <s-badge tone="success">New</s-badge>
              </s-stack>
            </s-stack>
            <s-heading>Create a new bundle for your customers.</s-heading>
          </s-box>

          <s-query-container>
            <s-grid
              gridTemplateColumns="@container (inline-size > 500px)1fr 1fr 1fr 1fr 1fr 1fr 1fr, 1fr"
              alignItems="start"
              gap="base"
            >
              <s-grid-item gridColumn="span 4">
                <s-stack gap="small-300">
                  {/* Trigger */}
                  <s-section>
                    <s-stack gap="small-300">
                      <s-stack
                        direction="inline"
                        gap="small-300"
                        onClick={() => handleToggle(0)}
                      >
                        <s-icon type="settings" />
                        <s-heading>Trigger</s-heading>
                        <s-icon type="chevron-down" />
                      </s-stack>
                      {activeIndex.includes(0) && (
                        <s-stack gap="base">
                          <s-stack
                            direction="inline"
                            gap="small-300"
                            justifyContent="center"
                          >
                            <s-box InlineSize="245px">
                              <s-text-field
                                label="Bundle name"
                                value={bundleName}
                                onChange={(e) => {
                                  setBundleName(e.target.value);
                                }}
                              />
                              <s-text type="small">
                                Customer wont see it,But it will be the
                                discount/bundle name.
                              </s-text>
                            </s-box>
                            <s-box InlineSize="245px">
                              <s-text-field
                                label="Bundle title"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                              />
                            </s-box>
                          </s-stack>
                          <s-stack gap="small-300">
                            <s-stack
                              direction="inline"
                              gap="base"
                              alignItems="center"
                            >
                              <s-box inlineSize="350px">
                                <s-select label="Trigger">
                                  <s-option>specific collection</s-option>
                                  <s-option>specific products</s-option>
                                </s-select>
                              </s-box>
                              <s-box paddingBlockStart="base">
                                <s-button onClick={handleProduct}>
                                  brows
                                </s-button>
                              </s-box>
                            </s-stack>
                            {products.length > 0 && (
                              <s-stack
                                border="base"
                                borderRadius="base"
                                padding="base"
                              >
                                {products.map((product) => (
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
                                        <s-paragraph>
                                          {product.publishedAt}
                                        </s-paragraph>
                                      </s-box>
                                    </s-stack>

                                    <s-box>
                                      <s-icon
                                        type="x"
                                        onClick={() =>
                                          removeProduct(product.id)
                                        }
                                      />
                                    </s-box>
                                  </s-stack>
                                ))}
                              </s-stack>
                            )}
                            <s-box>
                              <s-checkbox
                                checked={showVariantSelection}
                                onChange={handleVariantCheckboxChange}
                                label="Show variant selection"
                              />
                            </s-box>
                            {showVariantSelection && (
                              <s-stack
                                direction="inline"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <s-box>
                                  <s-checkbox
                                    label="Display variant image"
                                    checked={showVariantImag}
                                    onChange={handleShowVariantImg}
                                  />
                                </s-box>

                                {showVariantImag && (
                                  <s-stack
                                    direction="inline"
                                    justifyContent="space-between"
                                  >
                                    <s-box InlineSize="170px">
                                      <s-text>
                                        Size ({variantImagSizeValue}px)
                                      </s-text>
                                      <input
                                        style={{ width: "100%" }}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={variantImagSizeValue}
                                        onChange={(e) => {
                                          setVariantImagSizeValue(
                                            e.target.value,
                                          );
                                        }}
                                      />
                                    </s-box>
                                    <s-box inlineSize="170px">
                                      <s-text>
                                        Radius ({variantImagRadiusValue}px)
                                      </s-text>
                                      <input
                                        style={{ width: "100%" }}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={variantImagRadiusValue}
                                        onChange={(e) => {
                                          setVariantImagRadiusValue(
                                            e.target.value,
                                          );
                                        }}
                                      />
                                    </s-box>
                                  </s-stack>
                                )}
                              </s-stack>
                            )}

                            <s-box>
                              <s-checkbox
                                label="Compare price"
                                checked={comparePrice}
                                onChange={handleComparePrice}
                              />
                            </s-box>
                          </s-stack>
                        </s-stack>
                      )}
                    </s-stack>
                    {successMessage && (
                      <div
                        style={{
                          backgroundColor: "#d4edda",
                          color: "#155724",
                          padding: "15px",
                          border: "1px solid #c3e6cb",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          animation: "fadeIn 0.5s ease-out",
                        }}
                      >
                        <p style={{ margin: 0 }}>{successMessage}</p>
                      </div>
                    )}
                  </s-section>
                  {/* Style*/}
                  <s-section>
                    <s-stack>
                      <s-stack
                        direction="inline"
                        gap="small-300"
                        onClick={() => {
                          handleToggle(1);
                        }}
                      >
                        <s-icon type="paint-brush-flat" />
                        <s-heading>Style</s-heading>
                        <s-icon type="chevron-down" />
                      </s-stack>
                      {activeIndex.includes(1) && (
                        <s-stack gap="small-100">
                          <s-stack gap="small-100">
                            <s-stack
                              direction="inline"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <s-heading>alignment</s-heading>
                              <s-stack direction="inline" gap="base">
                                <s-box
                                  borderColor={
                                    selectedImage === "horizontal"
                                      ? "strong"
                                      : "base"
                                  }
                                  border="base"
                                  onClick={() =>
                                    handleImageSelect("horizontal")
                                  }
                                >
                                  <s-image
                                    aspectRatio="1"
                                    src="/app/assets/vertical.svg"
                                    objectFit="contain"
                                  />
                                </s-box>

                                <s-box
                                  borderColor={
                                    selectedImage === "vertical"
                                      ? "strong"
                                      : "base"
                                  }
                                  border="base"
                                  onClick={() => handleImageSelect("vertical")}
                                >
                                  <s-image
                                    src="/app/assets/horizontal.svg"
                                    aspectRatio="1"
                                    objectFit="contain"
                                  />
                                </s-box>
                              </s-stack>
                            </s-stack>
                            <s-box>
                              <s-text>Border Radius ({devBorder}px)</s-text>
                              <input
                                value={devBorder}
                                onChange={(e) => {
                                  setDevBorder(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                              ></input>
                            </s-box>
                            <s-box>
                              <s-heading>General Colors</s-heading>
                            </s-box>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                label={"Title"}
                                color={titleColor}
                                onChange={setTitleColor}
                              />
                              <ColorPickerField
                                label={"Title Lines"}
                                color={lineleColor}
                                onChange={setLineColor}
                              />
                            </s-stack>
                            <s-divider></s-divider>
                          </s-stack>

                          <s-stack gap="small-100">
                            <s-heading>Card Colors</s-heading>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                color={cardBgColor}
                                onChange={setCardBgColor}
                                label={"Card bg"}
                              />
                              <ColorPickerField
                                label={"Selected Card bg"}
                                color={selectedCardBgColor}
                                onChange={setSelectedCardBgColor}
                              />
                              <ColorPickerField
                                color={cardTitleColor}
                                onChange={setCardTitleColor}
                                label={"Card Title"}
                              />
                              <ColorPickerField
                                color={cardSubtitleColor}
                                onChange={setCardSubtitleColor}
                                label={"Card Subtitle"}
                              />
                            </s-stack>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                color={priceColor}
                                onChange={setPriceColor}
                                label={"Price"}
                              />
                              <ColorPickerField
                                color={comparePriceColor}
                                onChange={setComparePriceColor}
                                label={"Compare Price"}
                              />
                              <ColorPickerField
                                color={borderColor}
                                onChange={setBorderColor}
                                label={"Border"}
                              />
                            </s-stack>
                            <s-divider></s-divider>
                          </s-stack>

                          <s-stack gap="small-100">
                            <s-heading>Inside Badge Colors</s-heading>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                color={textColor}
                                onChange={setTextColor}
                                label={"Text"}
                              />
                              <ColorPickerField
                                color={backgroundColor}
                                onChange={setBackgroundColor}
                                label={"Background"}
                              />
                              <s-divider />
                            </s-stack>
                          </s-stack>

                          <s-stack gap="small-100">
                            <s-heading>OutSide Badge Colors</s-heading>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                color={outsideTextColor}
                                onChange={setOutsideTextColor}
                                label={"Text"}
                              />
                              <ColorPickerField
                                color={outsideBackgroundColor}
                                onChange={setOutsideBackgroundColor}
                                label={"Background"}
                              />
                              <s-divider />
                            </s-stack>
                          </s-stack>
                          <s-stack gap="small-100">
                            <s-heading>Upsell Colors</s-heading>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                color={upsellBackgroundColor}
                                onChange={setUpsellBackgroundColor}
                                label={"Background"}
                              />
                              <s-divider />
                            </s-stack>
                          </s-stack>

                          <s-stack gap="small-100">
                            <s-heading>Typography</s-heading>

                            <s-stack gap="small-100">
                              <s-stack
                                direction="inline"
                                gap="large-500"
                                justifyContent="start"
                                alignItems="center"
                              >
                                <SelectField
                                  label={"Main Title"}
                                  fontSize={fontSettings.mainTitle.fontSize}
                                  fontStyle={fontSettings.mainTitle.fontStyle}
                                  OnChangeFontSize={(value) =>
                                    handleFontSizeChange("mainTitle", value)
                                  }
                                  onChangeFontStyle={(value) =>
                                    handleFontStyleChange("mainTitle", value)
                                  }
                                />
                                <SelectField
                                  label={"Card Title"}
                                  fontSize={fontSettings.cardTitle.fontSize}
                                  fontStyle={fontSettings.cardTitle.fontStyle}
                                  OnChangeFontSize={(value) =>
                                    handleFontSizeChange("cardTitle", value)
                                  }
                                  onChangeFontStyle={(value) =>
                                    handleFontStyleChange("cardTitle", value)
                                  }
                                />
                              </s-stack>
                              <s-stack
                                direction="inline"
                                gap="large-300"
                                justifyContent="start"
                                alignItems="center"
                              >
                                <SelectField
                                  label={"Card Subtitle"}
                                  fontSize={fontSettings.cardSubtitle.fontSize}
                                  fontStyle={
                                    fontSettings.cardSubtitle.fontStyle
                                  }
                                  OnChangeFontSize={(value) =>
                                    handleFontSizeChange("cardSubtitle", value)
                                  }
                                  onChangeFontStyle={(value) =>
                                    handleFontStyleChange("cardSubtitle", value)
                                  }
                                />
                                <SelectField
                                  label={"Inside Badge"}
                                  fontSize={fontSettings.insideBadge.fontSize}
                                  fontStyle={fontSettings.insideBadge.fontStyle}
                                  OnChangeFontSize={(value) =>
                                    handleFontSizeChange("insideBadge", value)
                                  }
                                  onChangeFontStyle={(value) =>
                                    handleFontStyleChange("insideBadge", value)
                                  }
                                />
                              </s-stack>
                              <s-stack
                                direction="inline"
                                gap="large-300"
                                justifyContent="start"
                                alignItems="center"
                              >
                                <SelectField
                                  label={"Outside Badge"}
                                  fontSize={fontSettings.outsideBadge.fontSize}
                                  fontStyle={
                                    fontSettings.outsideBadge.fontStyle
                                  }
                                  OnChangeFontSize={(value) =>
                                    handleFontSizeChange("outsideBadge", value)
                                  }
                                  onChangeFontStyle={(value) =>
                                    handleFontStyleChange("outsideBadge", value)
                                  }
                                />
                                <SelectField
                                  label={"ATC Button"}
                                  fontSize={fontSettings.atcButton.fontSize}
                                  fontStyle={fontSettings.atcButton.fontStyle}
                                  OnChangeFontSize={(value) =>
                                    handleFontSizeChange("atcButton", value)
                                  }
                                  onChangeFontStyle={(value) =>
                                    handleFontStyleChange("atcButton", value)
                                  }
                                />
                              </s-stack>
                            </s-stack>
                            <s-divider />
                          </s-stack>

                          <s-stack gap="small-100">
                            <s-stack direction="inline" gap="large-300">
                              <s-box inlineSize="200px">
                                <s-text-field
                                  label="Text"
                                  value={atcButtonText}
                                  onChange={(e) => {
                                    setAtcButtonText(e.target.value);
                                  }}
                                />
                              </s-box>
                              <s-stack direction="inline" gap="small-300">
                                <ColorPickerField
                                  color={atcButtonBackgroundColor}
                                  onChange={setAtcButtonBackgroundColor}
                                  label={"Background"}
                                />

                                <ColorPickerField
                                  color={atcButtonTextColor}
                                  onChange={setAtcButtonTextColor}
                                  label={"text"}
                                />
                              </s-stack>
                            </s-stack>
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                            >
                              <s-box InlineSize="250px">
                                <s-paragraph>
                                  Padding Y ({paddingButton}rem){" "}
                                </s-paragraph>
                                <input
                                  value={paddingButton}
                                  onChange={(e) => {
                                    setPaddingButton(e.target.value);
                                  }}
                                  style={{ width: "100%" }}
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                ></input>
                              </s-box>
                              <s-box InlineSize="250px">
                                <s-paragraph>
                                  Border Radius ({borderRadiusButton}rem){" "}
                                </s-paragraph>
                                <input
                                  value={borderRadiusButton}
                                  onChange={(e) => {
                                    setBorderRadiusButton(e.target.value);
                                  }}
                                  style={{ width: "100%" }}
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                ></input>
                              </s-box>
                            </s-stack>
                            <s-box>
                              <s-checkbox defaultChecked label="Full Width" />
                            </s-box>
                            <s-box>
                              <s-text-area
                                label="Custom CSS"
                                value="*[id*='Quantity'],
                                  *[id*='price-template'],
                                  *[class*='product-form'] {
                                    display: none;
                                  }"
                                rows={6}
                              />
                            </s-box>
                          </s-stack>
                        </s-stack>
                      )}
                    </s-stack>
                  </s-section>
                  {/* Progressive Gifts */}
                  <s-section>
                    <s-stack gap="small-100">
                      <s-stack
                        direction="inline"
                        justifyContent="space-between"
                        onClick={() => handleToggle(2)}
                      >
                        <s-stack direction="inline" gap="small-300">
                          <s-icon type="gift-card" />
                          <s-heading>Progressive Gifts</s-heading>
                          <s-icon type="chevron-down" />
                        </s-stack>
                        <s-switch
                          checked={switchState}
                          onChange={handleSwitchChange}
                        />
                      </s-stack>
                      {activeIndex.includes(2) && (
                        <s-stack gap="small-100">
                          <s-stack
                            direction="inline"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <s-heading>alignment</s-heading>
                            <s-stack direction="inline" gap="base">
                              <s-box
                                borderColor={
                                  selectedGiftImage === "horizontal"
                                    ? "strong"
                                    : "base"
                                }
                                border="base"
                                onClick={() =>
                                  handleGiftImageSelect("horizontal")
                                }
                              >
                                <s-image
                                  aspectRatio="1"
                                  src="/app/assets/vertical.svg"
                                  objectFit="contain"
                                />
                              </s-box>

                              <s-box
                                borderColor={
                                  selectedGiftImage === "vertical"
                                    ? "strong"
                                    : "base"
                                }
                                border="base"
                                onClick={() =>
                                  handleGiftImageSelect("vertical")
                                }
                              >
                                <s-image
                                  src="/app/assets/horizontal.svg"
                                  aspectRatio="1"
                                  objectFit="contain"
                                />
                              </s-box>
                            </s-stack>
                          </s-stack>
                          <s-stack
                            direction="inline"
                            justifyContent="space-between"
                          >
                            <s-box inlineSize="245px">
                              <s-text-field
                                label="Titel"
                                value={textField1}
                                onChange={(e) => {
                                  setTextField1(e.target.value);
                                }}
                              />
                            </s-box>
                            <s-box inlineSize="245px">
                              <s-text-field
                                label="Subtitle"
                                value={textField2}
                                onChange={(e) => {
                                  setTextField2(e.target.value);
                                }}
                              />
                            </s-box>
                          </s-stack>

                          {giftSections.map((gift) => (
                            <s-stack gap="small-100" key={gift.id}>
                              <s-stack
                                direction="inline"
                                justifyContent="space-between"
                              >
                                <s-button
                                  icon="product"
                                  onClick={() => handlePro(gift.id)}
                                >
                                  select product
                                </s-button>
                                <s-link
                                  onClick={() => removeGiftSection(gift.id)}
                                >
                                  remove
                                </s-link>
                              </s-stack>

                              {gift.giftProducts &&
                                gift.giftProducts.length > 0 && (
                                  <s-stack
                                    border="base"
                                    borderRadius="base"
                                    padding="base"
                                  >
                                    {gift.giftProducts.map((product) => (
                                      <s-stack
                                        key={product.id}
                                        direction="inline"
                                        gap="base"
                                        justifyContent="space-between"
                                      >
                                        <s-stack direction="inline" gap="base">
                                          <s-box
                                            inlineSize="50px"
                                            blockSize="50px"
                                          >
                                            <s-image
                                              src={
                                                product.images &&
                                                product.images[0]
                                                  ? product.images[0]
                                                      .originalSrc
                                                  : ""
                                              }
                                              alt={product.title}
                                              aspectRatio="1/0.5"
                                              objectFit="cover"
                                            />
                                          </s-box>
                                          <s-box>
                                            <s-text>{product.title}</s-text>
                                            <s-paragraph>
                                              {product.publishedAt}
                                            </s-paragraph>
                                          </s-box>
                                        </s-stack>

                                        <s-box>
                                          <s-icon
                                            type="x"
                                            onClick={() =>
                                              deletePro(product.id, gift.id)
                                            }
                                          />
                                        </s-box>
                                      </s-stack>
                                    ))}
                                  </s-stack>
                                )}
                              <s-select
                                label="Unlock at"
                                value={gift.giftOffer}
                                onChange={(e) => handleOfferChange(e, gift.id)}
                              >
                                {offerOptions.map((offer) => (
                                  <s-option
                                    key={offer.value}
                                    value={offer.value}
                                  >
                                    {offer.label}
                                  </s-option>
                                ))}
                              </s-select>

                              <s-stack
                                direction="inline"
                                justifyContent="space-between"
                              >
                                <s-box inlineSize="250px">
                                  <s-text-field
                                    label="Label"
                                    value={giftType}
                                    onChange={(e) => {
                                      updateGiftSectionField(
                                        e.target.value,
                                        "giftType",
                                        gift.id,
                                      );
                                    }}
                                  />
                                </s-box>
                                <s-box inlineSize="250px">
                                  <s-text-field
                                    label="Crossed Label"
                                    value={giftPrice}
                                    onChange={(e) => {
                                      updateGiftSectionField(
                                        e.target.value,
                                        "giftPrice",
                                        gift.id,
                                      );
                                    }}
                                  />
                                </s-box>
                              </s-stack>

                              <s-stack
                                direction="inline"
                                justifyContent="space-between"
                              >
                                <s-box inlineSize="250px">
                                  <s-text-field
                                    label="Title"
                                    value={giftTitle}
                                    onChange={(e) => {
                                      updateGiftSectionField(
                                        e.target.value,
                                        "giftTitle",
                                        gift.id,
                                      );
                                    }}
                                  />
                                </s-box>
                                <s-box inlineSize="250px">
                                  <s-text-field
                                    label="Locked Title"
                                    value={giftLock}
                                    onChange={(e) => {
                                      updateGiftSectionField(
                                        e.target.value,
                                        "giftLock",
                                        gift.id,
                                      );
                                    }}
                                  />
                                </s-box>
                              </s-stack>
                            </s-stack>
                          ))}

                          <s-clickable
                            border="base"
                            padding="small-300"
                            borderRadius="base"
                            onClick={addGiftSection}
                          >
                            <s-stack
                              direction="inline"
                              gap="small-300"
                              justifyContent="center"
                            >
                              <s-icon type="gift-card" />
                              <s-text>Add Free Gift</s-text>
                            </s-stack>
                          </s-clickable>
                        </s-stack>
                      )}
                    </s-stack>
                  </s-section>
                  {offerSections.map((addSection, index) => (
                    <s-section key={addSection}>
                      <s-stack gap="base">
                        <s-stack
                          direction="inline"
                          justifyContent="space-between"
                          onClick={() => handleToggle(addSection.id)}
                        >
                          <s-stack direction="inline" gap="small-300">
                            <s-icon type="discount-code" />
                            <s-heading>{`Offer ${index + 1}`}</s-heading>
                            <s-icon type="chevron-down" />
                          </s-stack>
                          <s-stack direction="inline">
                            <s-icon type="arrow-up" />
                            <s-icon type="arrow-down" />
                            <s-icon
                              type="duplicate"
                              onClick={(e) => {
                                e.stopPropagation();
                                addOfferSection();
                              }}
                            />
                            <s-icon
                              type="delete"
                              onClick={() => removeOfferSection(addSection.id)}
                            />
                          </s-stack>
                        </s-stack>

                        {activeIndex.includes(addSection.id) && (
                          <Offers
                            key={addSection.id}
                            offerSection={addSection}
                            updateOfferSectionField={updateOfferSectionField}
                            titleOffer={titleOffer}
                            onChangeTitleOffer={setTitleOffer}
                            subtitleOffer={subtitleOffer}
                            onChangeSubtitleOffer={setSubtitleOffer}
                            defaultSelected={defaultSelected}
                            onChangeDefaultSelected={setDefaultSelected}
                            insideBadgeText={insideBadgeText}
                            onChangeInsideBadgeText={setInsideBadgeText}
                            outsideBadgeText={outsideBadgeText}
                            onChangeOutSideBadgeText={setOutsideBadgeText}
                            discountType={discountType}
                            onChangeDiscountType={setDiscountType}
                            quantity={quantity}
                            onChangeQuantity={setQuantity}
                            displayProductImage={displayProductImage}
                            onChangeDisplayProductImage={setDisplayProductImage}
                            imageSize={imageSize}
                            onChangeImageSize={setImageSize}
                            imageBorderRadius={imageBorderRadius}
                            onChangeImageBorderRadius={setImageBorderRadius}
                            addUpsellProductSections={addUpsellProductSections}
                            addUpsellProductSection={addUpsellProductSection}
                            removeUpsellProductSection={
                              removeUpsellProductSection
                            }
                            handleUpsellProduct={handleUpsellProduct}
                            removeUpsellProduct={removeUpsellProduct}
                            updateUpsellProductField={updateUpsellProductField}
                            discountUpsell={discountUpsell}
                            discountPerItem={discountPerItem}
                            upsellText={upsellText}
                            selectDefault={selectDefault}
                            addGiftProductSections={addGiftProductSections}
                            addGiftProductSection={addGiftProductSection}
                            handleMyProduct={handleMyProduct}
                            removeMyProduct={removeMyProduct}
                            removeGiftProductSection={removeGiftProductSection}
                            updateGiftProductField={updateGiftProductField}
                            textGift={textGift}
                            selectDefaultGift={selectDefaultGift}
                          />
                        )}
                      </s-stack>
                    </s-section>
                  ))}

                  <s-clickable
                    border="base"
                    padding="base"
                    background="subdued"
                    borderRadius="base"
                    onClick={addOfferSection}
                  >
                    <s-stack
                      direction="inline"
                      gap="small-300"
                      justifyContent="center"
                    >
                      <s-icon type="plus-circle" />
                      <s-text>Add Offer</s-text>
                    </s-stack>
                  </s-clickable>
                </s-stack>
              </s-grid-item>
              <s-grid-item gridColumn="span 3">
                <div
                  style={{
                    position: "fixed",
                    maxWidth: "450px",
                  }}
                >
                  <s-section>
                    <s-stack gap="small-100">
                      <s-stack
                        direction="inline"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <s-stack
                          direction="inline"
                          gap="small-300"
                          alignItems="center"
                        >
                          <s-icon type="external" />
                          <s-link>Preview</s-link>
                        </s-stack>
                        <s-box>
                          <s-button disabled>Run A/B test</s-button>
                        </s-box>
                      </s-stack>

                      <s-stack gap="base">
                        <s-clickable
                          border="base"
                          padding="base"
                          background="subdued"
                          borderRadius="base"
                        >
                          <s-stack
                            direction="inline"
                            gap="base"
                            justifyContent="space-between"
                          >
                            <s-box inlineSize="170px">
                              <s-select label="Product previewing">
                                <s-option>Gift Card</s-option>
                              </s-select>
                            </s-box>
                            <s-box inlineSize="170px">
                              <s-select label="Country previewing">
                                <s-option>Afghanistan </s-option>
                              </s-select>
                            </s-box>
                          </s-stack>
                        </s-clickable>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              flexGrow: 1,
                              height: "1px",
                              backgroundColor: lineleColor,
                              marginRight: "10px",
                            }}
                          ></div>

                          <h2
                            style={{
                              fontSize: `${fontSettings.mainTitle.fontSize}px`,
                              fontWeight: fontSettings.mainTitle.fontStyle,
                              fontStyle: fontSettings.mainTitle.italic
                                ? "italic"
                                : "normal",
                              margin: "0",
                              color: titleColor,
                            }}
                          >
                            {title}
                          </h2>

                          <div
                            style={{
                              flexGrow: 1,
                              height: "1px",
                              backgroundColor: lineleColor,
                              marginLeft: "10px",
                            }}
                          ></div>
                        </div>

                        {selectedImage === "horizontal"
                          ? offerSections.map((addSection, index) => (
                              <s-stack key={index} gap="small-100">
                                <div
                                  style={{
                                    border: `solid 2px ${borderColor}`,
                                    borderRadius: `${devBorder}px`,
                                    padding: "10px",
                                    position: "relative",
                                    backgroundColor: chooseDefault
                                      ? "#AAF0FB"
                                      : cardBgColor,
                                  }}
                                >
                                  <s-stack
                                    direction="inline"
                                    justifyContent="space-between"
                                  >
                                    <s-stack
                                      direction="inline"
                                      gap="base"
                                      alignItems="center"
                                    >
                                      <s-choice-list
                                        onChange={(e) => {
                                          setChooseDefault(
                                            e.target.currentTarget.values,
                                          );
                                        }}
                                      >
                                        <s-choice value={chooseDefault} />
                                      </s-choice-list>

                                      <s-box>
                                        <s-stack
                                          direction="inline"
                                          gap="small-300"
                                          alignItems="center"
                                        >
                                          <h3
                                            style={{
                                              fontSize: `${fontSettings.cardTitle.fontSize}px`,
                                              fontWeight:
                                                fontSettings.cardTitle
                                                  .fontStyle,
                                              fontStyle: fontSettings.cardTitle
                                                .italic
                                                ? "italic"
                                                : "normal",
                                              color: cardTitleColor,
                                              padding: "0px",
                                              margin: "0px",
                                            }}
                                          >
                                            {addSection.titleOffer}
                                          </h3>

                                          <s-box>
                                            <button
                                              style={{
                                                fontSize: `${fontSettings.insideBadge.fontSize}px`,
                                                fontWeight:
                                                  fontSettings.insideBadge
                                                    .fontStyle,
                                                fontStyle: fontSettings
                                                  .insideBadge.italic
                                                  ? "italic"
                                                  : "normal",
                                                backgroundColor:
                                                  backgroundColor,
                                                color: textColor,
                                                borderRadius: "5px",
                                                padding: "3px",
                                              }}
                                            >
                                              {addSection.insideBadgeText}
                                            </button>
                                          </s-box>
                                        </s-stack>

                                        <p
                                          style={{
                                            fontSize: `${fontSettings.cardSubtitle.fontSize}px`,
                                            fontWeight:
                                              fontSettings.cardSubtitle
                                                .fontStyle,
                                            fontStyle: fontSettings.cardSubtitle
                                              .italic
                                              ? "italic"
                                              : "normal",
                                            color: cardSubtitleColor,
                                            padding: "0px",
                                            margin: "0px",
                                          }}
                                        >
                                          {addSection.subtitleOffer}
                                        </p>
                                      </s-box>
                                    </s-stack>

                                    <s-stack
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <h2 style={{ color: priceColor }}>
                                        $19.00
                                      </h2>
                                      {comparePrice && (
                                        <p style={{ color: comparePriceColor }}>
                                          $20.00
                                        </p>
                                      )}
                                    </s-stack>
                                  </s-stack>

                                  {showVariantSelection && (
                                    <s-stack
                                      direction="inline"
                                      gap="small-300"
                                      alignItems="center"
                                    >
                                      <s-box>
                                        <s-button variant="primary">
                                          #1
                                        </s-button>
                                      </s-box>
                                      {showVariantImag && (
                                        <div
                                          style={{
                                            color: "gray",
                                            backgroundColor:
                                              "rgba(241, 241, 241, 1)",
                                            padding: `${variantImagSizeValue}px`,
                                            margin: "0px",
                                            borderRadius: `${variantImagRadiusValue}px`,
                                            alignItems: "center",
                                            textAlign: "center",
                                          }}
                                        >
                                          <FiBox
                                            style={{
                                              width: "15px",
                                              height: "15px",
                                            }}
                                          />
                                        </div>
                                      )}
                                      <s-box inlineSize="100px">
                                        <s-select>
                                          <s-option>$10</s-option>
                                          <s-option>$25</s-option>
                                          <s-option>$50</s-option>
                                          <s-option>$100</s-option>
                                        </s-select>
                                      </s-box>
                                    </s-stack>
                                  )}

                                  {addSection.upsellProductdd &&
                                    addSection.upsellProductdd.length > 0 && (
                                      <s-table>
                                        {addSection.upsellProductdd.map(
                                          (product) => (
                                            <s-table-header-row
                                              key={product.id}
                                            >
                                              <s-table-header>
                                                <s-icon type="layout-column-1" />
                                              </s-table-header>

                                              <s-table-header>
                                                <s-image
                                                  src={
                                                    product.images &&
                                                    product.images[0]
                                                      ? product.images[0]
                                                          .originalSrc
                                                      : ""
                                                  }
                                                  alt={product.title}
                                                  aspectRatio="1/0.5"
                                                  objectFit="cover"
                                                />
                                              </s-table-header>

                                              <s-table-header>
                                                <s-text>{product.title}</s-text>
                                              </s-table-header>

                                              <s-table-header>
                                                <s-select disabled>
                                                  <s-option>
                                                    {product.title} - $10
                                                  </s-option>
                                                </s-select>
                                              </s-table-header>

                                              <s-table-header>
                                                $10.00
                                              </s-table-header>
                                            </s-table-header-row>
                                          ),
                                        )}
                                      </s-table>
                                    )}

                                  {addSection.giftProductsd &&
                                    addSection.giftProductsd.length > 0 && (
                                      <s-table>
                                        {addSection.giftProductsd.map(
                                          (product) => (
                                            <s-table-header-row
                                              key={product.id}
                                            >
                                              <s-table-header>
                                                <s-icon type="layout-column-1" />
                                              </s-table-header>

                                              <s-table-header>
                                                <s-image
                                                  src={
                                                    product.images &&
                                                    product.images[0]
                                                      ? product.images[0]
                                                          .originalSrc
                                                      : ""
                                                  }
                                                  alt={product.title}
                                                  aspectRatio="1/0.5"
                                                  objectFit="cover"
                                                />
                                              </s-table-header>

                                              <s-table-header>
                                                <s-text>{product.title}</s-text>
                                              </s-table-header>

                                              <s-table-header>
                                                <s-select disabled>
                                                  <s-option>
                                                    {product.title} - $10
                                                  </s-option>
                                                </s-select>
                                              </s-table-header>

                                              <s-table-header>
                                                $10.00
                                              </s-table-header>
                                            </s-table-header-row>
                                          ),
                                        )}
                                      </s-table>
                                    )}
                                  <div
                                    style={{
                                      fontSize: `${fontSettings.outsideBadge.fontSize}px`,
                                      fontWeight:
                                        fontSettings.outsideBadge.fontStyle,
                                      fontStyle: fontSettings.outsideBadge
                                        .italic
                                        ? "italic"
                                        : "normal",
                                      right: "-5px",
                                      padding: "5px",
                                      top: "-12px",
                                      borderRadius: "10px",
                                      position: "absolute",
                                      transform: "rotate(20deg)",
                                      transformOrigin: "center",
                                      whiteSpace: "nowrap",
                                      backgroundColor: outsideBackgroundColor,
                                      color: outsideTextColor,
                                    }}
                                  >
                                    {addSection.outsideBadgeText}
                                  </div>
                                </div>
                              </s-stack>
                            ))
                          : selectedImage === "vertical" && (
                              <div
                                style={{
                                  display: "flex",

                                  flexWrap: "nowrap",
                                  gap: "10px",
                                  justifyContent: "space-between",
                                  alignItems: "stretch",
                                  width: "100%",
                                }}
                              >
                                {offerSections.map((addSection, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      textAlign: "center",
                                      alignContent: "center",
                                      border: `solid 2px ${borderColor}`,
                                      borderRadius: `${devBorder}px`,
                                      padding: "10px",
                                      position: "relative",
                                      backgroundColor: cardBgColor,
                                      display: "flex",
                                      flexDirection: "column",
                                      flexWrap: "nowrap",

                                      gap: "5px",
                                      justifyContent: "space-between",
                                      alignItems: "stretch",
                                      flex: 1,
                                    }}
                                  >
                                    <div
                                      style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                      }}
                                    >
                                      <s-box>
                                        <s-choice-list>
                                          <s-choice value="optional" />
                                        </s-choice-list>
                                      </s-box>

                                      <h3
                                        style={{
                                          width: "100%",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          fontSize: `${fontSettings.cardTitle.fontSize}px`,
                                          fontWeight:
                                            fontSettings.cardTitle.fontStyle,
                                          fontStyle: fontSettings.cardTitle
                                            .italic
                                            ? "italic"
                                            : "normal",
                                          color: cardTitleColor,
                                          margin: "5px",
                                          padding: "0px",
                                        }}
                                      >
                                        {addSection.titleOffer}
                                      </h3>

                                      {/* Best Offer Button */}
                                      <s-box>
                                        <button
                                          style={{
                                            fontSize: `${fontSettings.insideBadge.fontSize}px`,
                                            fontWeight:
                                              fontSettings.insideBadge
                                                .fontStyle,
                                            fontStyle: fontSettings.insideBadge
                                              .italic
                                              ? "italic"
                                              : "normal",
                                            backgroundColor: backgroundColor,
                                            color: textColor,
                                            borderRadius: "5px",
                                            padding: "3px",
                                          }}
                                        >
                                          {addSection.insideBadgeText}
                                        </button>
                                      </s-box>

                                      {/* Discount Info */}
                                      <p
                                        style={{
                                          fontSize: `${fontSettings.cardSubtitle.fontSize}px`,
                                          fontWeight:
                                            fontSettings.cardSubtitle.fontStyle,
                                          fontStyle: fontSettings.cardSubtitle
                                            .italic
                                            ? "italic"
                                            : "normal",
                                          color: cardSubtitleColor,
                                          margin: "5px",
                                          padding: "0px",
                                        }}
                                      >
                                        {addSection.subtitleOffer}
                                      </p>

                                      {/* Price Information */}
                                      <h2
                                        style={{
                                          color: priceColor,
                                          padding: "0px",
                                          margin: "0px",
                                        }}
                                      >
                                        $19.00
                                      </h2>

                                      {/* Compare Price */}
                                      {comparePrice && (
                                        <p style={{ color: comparePriceColor }}>
                                          $20.00
                                        </p>
                                      )}
                                      <div
                                        style={{ backgroundColor: "#CCCCCC" }}
                                      >
                                        {addSection.upsellProductdd &&
                                          addSection.upsellProductdd.length >
                                            0 &&
                                          addSection.upsellProductdd.map(
                                            (product) => (
                                              <div key={product.id}>
                                                <span>
                                                  <s-icon type="layout-column-1" />
                                                </span>

                                                <span
                                                  style={{
                                                    backgroundColor: "#CCCCCC",
                                                  }}
                                                >
                                                  <s-image
                                                    src={
                                                      product.images &&
                                                      product.images[0]
                                                        ? product.images[0]
                                                            .originalSrc
                                                        : ""
                                                    }
                                                    alt={product.title}
                                                    aspectRatio="1/0.5"
                                                    objectFit="cover"
                                                  />
                                                </span>

                                                <span>
                                                  <s-text>
                                                    {product.title}
                                                  </s-text>
                                                </span>

                                                <span>$10.00</span>
                                              </div>
                                            ),
                                          )}

                                        {addSection.giftProductsd &&
                                          addSection.giftProductsd.length > 0 &&
                                          addSection.giftProductsd.map(
                                            (product) => (
                                              <div key={product.id}>
                                                <span>
                                                  <s-icon type="layout-column-1" />
                                                </span>

                                                <span>
                                                  <s-image
                                                    src={
                                                      product.images &&
                                                      product.images[0]
                                                        ? product.images[0]
                                                            .originalSrc
                                                        : ""
                                                    }
                                                    alt={product.title}
                                                    aspectRatio="1/0.5"
                                                    objectFit="cover"
                                                  />
                                                </span>

                                                <span>
                                                  <s-text>
                                                    {product.title}
                                                  </s-text>
                                                </span>

                                                <span>$10.00</span>
                                              </div>
                                            ),
                                          )}
                                      </div>

                                      {/* Outside Badge */}
                                      <div
                                        style={{
                                          fontSize: `${fontSettings.outsideBadge.fontSize}px`,
                                          fontWeight:
                                            fontSettings.outsideBadge.fontStyle,
                                          fontStyle: fontSettings.outsideBadge
                                            .italic
                                            ? "italic"
                                            : "normal",
                                          padding: "5px",
                                          top: "-12px",
                                          borderRadius: "10px",
                                          position: "absolute",
                                          backgroundColor:
                                            outsideBackgroundColor,
                                          color: outsideTextColor,
                                        }}
                                      >
                                        {addSection.outsideBadgeText}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                        {switchState && (
                          <s-stack justifyContent="center" alignItems="center">
                            <h2 style={{ margin: "0px", padding: "0px" }}>
                              {textField1}
                            </h2>

                            <p style={{ margin: "0px", padding: "0px" }}>
                              {textField2}
                            </p>
                          </s-stack>
                        )}
                        {selectedGiftImage === "horizontal" ? (
                          giftSections.map((giftSection) => (
                            <div key={giftSection.id}>
                              {giftSection.giftProducts.length > 0 ? (
                                <div
                                  style={{
                                    border: "solid 2px #AAF0FB",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "stretch",
                                    height: "50px",

                                    justifyContent: "space-between",
                                  }}
                                >
                                  {giftSection.giftOffer === "1" ? (
                                    giftSection.giftProducts.map((product) => (
                                      <div
                                        key={product.id}
                                        style={{
                                          flex: 1,
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <s-stack
                                          direction="inline"
                                          gap="base"
                                          alignItems="center"
                                        >
                                          <s-box
                                            inlineSize="50px"
                                            blockSize="50px"
                                          >
                                            <s-image
                                              src={
                                                product.images &&
                                                product.images[0]
                                                  ? product.images[0]
                                                      .originalSrc
                                                  : ""
                                              }
                                              alt={product.title}
                                              aspectRatio="1/0.5"
                                              objectFit="cover"
                                            />
                                          </s-box>
                                          <s-stack
                                            direction="inline"
                                            gap="small-100"
                                            paddingBlockStart="small"
                                          >
                                            <s-text>
                                              {giftSection.giftTitle}
                                            </s-text>
                                            <button
                                              style={{
                                                padding: "5px",
                                                border: "none",
                                                borderRadius: "10px",
                                                backgroundColor: "#AAF0FB",
                                                color: "black",
                                              }}
                                            >
                                              <span>
                                                {giftSection.giftType}
                                              </span>
                                              <span
                                                style={{
                                                  marginLeft: "4px",
                                                  textDecorationLine:
                                                    "line-through",
                                                }}
                                              >
                                                {giftSection.giftPrice}
                                              </span>
                                            </button>
                                          </s-stack>
                                        </s-stack>
                                      </div>
                                    ))
                                  ) : (
                                    <s-stack
                                      direction="inline"
                                      gap="small-300"
                                      alignItems="center"
                                    >
                                      <s-icon type="lock" />
                                      <span>{giftSection.giftLock}</span>
                                    </s-stack>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          ))
                        ) : selectedGiftImage === "vertical" ? (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "10px",
                              justifyContent: "space-between",
                              alignItems: "stretch",
                              width: "100%",
                            }}
                          >
                            {giftSections.map(
                              (giftSection) =>
                                giftSection.giftProducts.length > 0 && (
                                  <div
                                    key={giftSection.id}
                                    style={{
                                      border: "solid 2px #AAF0FB",
                                      borderRadius: "10px",
                                      position: "relative",
                                      display: "flex",
                                      flexDirection: "column",
                                      flex: 1,
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {giftSection.giftOffer === "1" ? (
                                      giftSection.giftProducts.map(
                                        (product) => (
                                          <div
                                            key={product.id}
                                            style={{
                                              position: "relative",
                                              marginTop: "20px",
                                              marginBottom: "10px",
                                              flex: 1,
                                            }}
                                          >
                                            <s-stack
                                              gap="base"
                                              direction="block"
                                              alignItems="center"
                                            >
                                              <s-box
                                                inlineSize="50px"
                                                blockSize="50px"
                                              >
                                                <s-image
                                                  src={
                                                    product.images &&
                                                    product.images[0]
                                                      ? product.images[0]
                                                          .originalSrc
                                                      : ""
                                                  }
                                                  alt={product.title}
                                                  aspectRatio="1/0.5"
                                                  objectFit="cover"
                                                />
                                              </s-box>
                                              <s-text>
                                                {giftSection.giftTitle}
                                              </s-text>
                                            </s-stack>
                                            <button
                                              style={{
                                                padding: "5px",
                                                border: "none",
                                                borderRadius: "10px",
                                                backgroundColor: "#AAF0FB",
                                                color: "black",
                                                position: "absolute",
                                                top: "-30px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                              }}
                                            >
                                              <span>
                                                {giftSection.giftType}
                                              </span>
                                              <span
                                                style={{
                                                  marginLeft: "4px",
                                                  textDecorationLine:
                                                    "line-through",
                                                }}
                                              >
                                                {giftSection.giftPrice}
                                              </span>
                                            </button>
                                          </div>
                                        ),
                                      )
                                    ) : (
                                      <div>
                                        <s-stack
                                          alignItems="center"
                                          justifyContent="center"
                                          direction="block"
                                          gap="small-300"
                                          padding="large-300"
                                        >
                                          <s-icon type="lock" />
                                          <span>{giftSection.giftLock}</span>
                                        </s-stack>
                                      </div>
                                    )}
                                  </div>
                                ),
                            )}
                          </div>
                        ) : null}

                        <s-stack justifyContent="center" alignItems="center">
                          <button
                            style={{
                              fontSize: `${fontSettings.atcButton.fontSize}px`,
                              fontWeight: fontSettings.atcButton.fontStyle,
                              fontStyle: fontSettings.atcButton.italic
                                ? "italic"
                                : "normal",
                              width: "100%",
                              backgroundColor: atcButtonBackgroundColor,
                              color: atcButtonTextColor,
                              padding: `${paddingButton}px 10px`,
                              borderRadius: `${borderRadiusButton}px`,
                            }}
                          >
                            {atcButtonText}
                          </button>
                        </s-stack>
                      </s-stack>
                    </s-stack>
                  </s-section>
                </div>
              </s-grid-item>
            </s-grid>
          </s-query-container>
        </Form>
      </s-stack>
    </s-page>
  );
}
