import { Flex, Spin } from "antd";

export default function PageLoader() {
  return (
    <Flex justify="center" style={{ paddingTop: "80px" }}>
      <Spin size="large" />
    </Flex>
  );
}
