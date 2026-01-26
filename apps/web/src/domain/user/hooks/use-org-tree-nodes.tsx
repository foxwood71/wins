import { useMemo } from "react";
import { UserCircle, Building2, MapPin, Landmark } from "lucide-react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import { SECTORS, CENTERS, DEPARTMENTS, USERS } from "../data/user-mock";
import { User, Department, Center, Sector, OrgData } from "../model/types";

// =============================================================================
// 🏢 1. 부서 관리용 Hook (부서가 최하위 노드)
// =============================================================================
export function useDeptTreeNodes(searchTerm: string) {
  return useMemo<TreeNode<OrgData>[]>(() => {
    // 검색어 매칭 헬퍼
    const isMatch = (item: { name: string; code?: string | null }) => {
      if (!searchTerm) return true;
      return (
        item.name.includes(searchTerm) ||
        (item.code && item.code.includes(searchTerm))
      );
    };

    return SECTORS.map((sector): TreeNode<OrgData> | null => {
      // 1-1. [직영 부서] (센터 없음, 섹터 직속)
      const directDeptNodes = DEPARTMENTS.filter(
        (d) => d.sector_id === sector.id && !d.center_id && isMatch(d),
      ).map((dept) => ({
        id: `dept-${dept.id}`,
        label: dept.name,
        icon: Building2,
        // ✨ 중요: 부서 관리는 여기가 끝(Leaf)이므로 children을 아예 넣지 않음 (undefined)
        data: dept,
      }));

      // 1-2. [센터] 및 산하 부서
      const centerNodes = CENTERS.filter((c) => c.sector_id === sector.id)
        .map((center): TreeNode<OrgData> | null => {
          // 센터 산하 부서 필터링
          const centerDeptNodes = DEPARTMENTS.filter(
            (d) => d.center_id === center.id && isMatch(d),
          ).map((dept) => ({
            id: `dept-${dept.id}`,
            label: dept.name,
            icon: Building2,
            // ✨ 중요: 여기도 children 없음
            data: dept,
          }));

          // 검색어가 있는데 하위 부서가 하나도 없으면 센터도 숨김
          if (searchTerm && centerDeptNodes.length === 0) return null;

          // 하위 부서가 없더라도 센터 자체는 검색어에 걸릴 수 있으나,
          // 보통 조직도는 하위가 없으면 안 보여주는게 깔끔함.
          if (centerDeptNodes.length === 0) return null;

          return {
            id: `center-${center.id}`,
            label: center.name,
            icon: MapPin,
            children: centerDeptNodes,
            data: center,
          };
        })
        .filter((node): node is TreeNode<OrgData> => node !== null);

      // 하위 요소(직영부서, 센터)가 하나도 없으면 섹터 숨김
      if (directDeptNodes.length === 0 && centerNodes.length === 0) {
        return null;
      }

      return {
        id: `sector-${sector.id}`,
        label: sector.name,
        icon: Landmark,
        children: [...directDeptNodes, ...centerNodes],
        data: sector,
      };
    }).filter((node): node is TreeNode<OrgData> => node !== null);
  }, [searchTerm]);
}

// =============================================================================
// 👤 2. 사용자 관리용 Hook (사용자가 최하위 노드)
// =============================================================================
export function useUserTreeNodes(searchTerm: string) {
  return useMemo<TreeNode<OrgData>[]>(() => {
    // 사용자 매칭 헬퍼 (부서 ID로 사용자 찾기)
    const getUsersInDept = (deptId: number): TreeNode<OrgData>[] => {
      return USERS.filter(
        (u) =>
          u.department_id === deptId &&
          (!searchTerm ||
            u.name.includes(searchTerm) ||
            u.login_id.includes(searchTerm)),
      ).map((user) => ({
        id: user.id, // 사용자는 ID 그대로 사용
        label: user.name,
        icon: UserCircle,
        subInfo: [user.login_id],
        // ✨ 중요: 사용자는 최하위이므로 children 없음
        data: user,
      }));
    };

    return SECTORS.map((sector): TreeNode<OrgData> | null => {
      // 2-1. [직영 부서] 처리
      const directDeptNodes = DEPARTMENTS.filter(
        (d) => d.sector_id === sector.id && !d.center_id,
      )
        .map((dept): TreeNode<OrgData> | null => {
          const userNodes = getUsersInDept(dept.id);
          // 사용자가 없으면 부서도 표시하지 않음 (사용자 관리 목적이므로)
          if (userNodes.length === 0) return null;

          return {
            id: `dept-${dept.id}`,
            label: dept.name,
            icon: Building2,
            children: userNodes, // 여기엔 사용자가 들어감
            data: dept,
          };
        })
        .filter((node): node is TreeNode<OrgData> => node !== null);

      // 2-2. [센터] 처리
      const centerNodes = CENTERS.filter((c) => c.sector_id === sector.id)
        .map((center): TreeNode<OrgData> | null => {
          // 센터 산하 부서 처리
          const centerDeptNodes = DEPARTMENTS.filter(
            (d) => d.center_id === center.id,
          )
            .map((dept): TreeNode<OrgData> | null => {
              const userNodes = getUsersInDept(dept.id);
              if (userNodes.length === 0) return null;

              return {
                id: `dept-${dept.id}`,
                label: dept.name,
                icon: Building2,
                children: userNodes,
                data: dept,
              };
            })
            .filter((node): node is TreeNode<OrgData> => node !== null);

          // 사용자가 포함된 부서가 하나도 없으면 센터 숨김
          if (centerDeptNodes.length === 0) return null;

          return {
            id: `center-${center.id}`,
            label: center.name,
            icon: MapPin,
            children: centerDeptNodes,
            data: center,
          };
        })
        .filter((node): node is TreeNode<OrgData> => node !== null);

      // 내부에 표시할 노드가 없으면 섹터 숨김
      if (directDeptNodes.length === 0 && centerNodes.length === 0) {
        return null;
      }

      return {
        id: `sector-${sector.id}`,
        label: sector.name,
        icon: Landmark,
        children: [...directDeptNodes, ...centerNodes],
        data: sector,
      };
    }).filter((node): node is TreeNode<OrgData> => node !== null);
  }, [searchTerm]);
}
