import MobileAppChangeButtonMessage from '@/models/MobileAppChangeButtonMessage';
import Platform from '@/types/Platform';

const isMobile = (platform: Platform) => {
  return platform === Platform.Android || platform === Platform.iOS;
};

const getLink = (
  platform: Platform,
  searchParams: { [k: string]: string } = {},
  title?: string,
  buttons: MobileAppChangeButtonMessage[] = [],
): string => {
  const queryString = new URLSearchParams(
    Object.entries(searchParams),
  ).toString();

  if (isMobile(platform)) {
    return getDeeplink(queryString, title, buttons);
  }
  return `${location.origin}${location.pathname}?${queryString}`;
};

const getDeeplink = (
  queryString: string,
  title?: string,
  buttons: MobileAppChangeButtonMessage[] = [],

): string => {
  const location = document.location;
  const actorParams = {
    url: `${location.origin}${location.pathname}?${queryString}`,
    kioskMode: true,
    shareSessionInfo: true,
    buttons,
    title
  };

  return (
    'actor:WebBrowserActor?params=' +
    encodeURIComponent(JSON.stringify(actorParams))
  );
};

const getLinkToImage = (
  platform: Platform,
  fileIds: string[],
  index: number,
) => {
  if (isMobile(platform)) {
    return (
      'actor:PhotoViewerActor?params=' +
      encodeURIComponent(
        JSON.stringify({
          fileIds,
          startIndex: index,
        }),
      )
    );
  }
  return '';
};

const getImageSource = (backend: string, id: string) => {
  return `${backend}/images/${id}/download`;
};

export { getLink, getImageSource, getLinkToImage };
