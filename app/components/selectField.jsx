export const SelectField = ({label}) => {
  return (
    <s-stack>
      <s-heading>{label}</s-heading>
      <s-stack direction="inline" gap="small-300">
        <s-box maxInlineSize="110px">
          <s-text-field label="Font Size (px)"></s-text-field>
        </s-box>
        <s-box maxInlineSize="110px">
          <s-select label="Font Style ">
            <s-option value="500-italic">Medium Italic</s-option>
            <s-option value="300-italic">Light Italic</s-option>
            <s-option value="400">Regular</s-option>
            <s-option value="400-italic">Italic</s-option>
            <s-option value="500">Medium</s-option>
            <s-option value="700">Bold</s-option>
            <s-option value="700-italic">Bold Italic</s-option>
            <s-option value="300">Light</s-option>
          </s-select>
        </s-box>
      </s-stack>
    </s-stack>
  );
};
