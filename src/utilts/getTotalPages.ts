import { router } from "../Router";

export const getTotalPages = () => {
  const children = router.routes[0]?.children || [];

  return children.filter(route => /^\d+$/.test(route.path || "")).length;
};