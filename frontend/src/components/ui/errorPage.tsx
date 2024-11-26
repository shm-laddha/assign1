import { Flex, Typography } from "antd";

export const ErrorPage: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => (
  <Flex justify="center" style={{ paddingTop: "150px" }}>
    <Typography.Text type="danger">{errorMessage}</Typography.Text>
  </Flex>
);
