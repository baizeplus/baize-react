import useUserStore from "@/store/user";

export function usePermissions() {
  const permissions = useUserStore((state) => state.permissions);

  const hasAuth = (role: string) => {
    return permissions.includes(role);
  };

  return { hasAuth };
}
