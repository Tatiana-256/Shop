import { Helmet } from "react-helmet";

type PropsT = {
  title?: string;
};

export const MetaData: React.FC<PropsT> = ({ title = "LOVE" }) => {
  return (
    <Helmet>
      <title>{`${title} - ShopIT`}</title>
    </Helmet>
  );
};
