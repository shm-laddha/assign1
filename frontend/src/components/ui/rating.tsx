import React, { useEffect, useState } from "react";
import { Flex, Rate } from "antd";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

interface Iprops {
  initialValue: number;
  onChange: (arg0: number) => void;
}

const RatingInput: React.FC<Iprops> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Flex gap="middle" vertical>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span>{desc[value - 1]}</span> : null}
    </Flex>
  );
};

export { RatingInput };
