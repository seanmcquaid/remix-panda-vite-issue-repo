import setAcceptLanguageHeaders from "~/utils/setAcceptLanguageHeaders";
import i18next from "./i18n.server";

const getAppFixedT = async (request: Request) => {
  setAcceptLanguageHeaders(request);
  const t = await i18next.getFixedT(request);
  return { t };
};

export default getAppFixedT;
