import { useMemo } from "react";
import { UserCircle, Building2, MapPin, Landmark } from "lucide-react";
import { TreeNode } from "@/shared/components/navigation/nav-tree"; // 공통 트리 타입
import { SECTORS, CENTERS, DEPARTMENTS, USERS } from "../data/user-mock";
import { User, Department, Center, Sector } from "../model/types";

// 이 훅에서 사용할 전체 유니온 타입
export type OrgData = Sector | Center | Department | User;

// 옵션 타입 정의
interface UseOrgTreeNodesOptions {
  searchTerm: string;
  includeUsers?: boolean; // 사용자 포함 여부 (true: 사용자 관리, false: 부서 관리)
}

export function useOrgTreeNodes({
  searchTerm,
  includeUsers = false,
}: UseOrgTreeNodesOptions) {
  return useMemo<TreeNode<OrgData>[]>(() => {
    // [Helper] 사용자 노드 매핑 함수
    const mapUsers = (deptId: number): TreeNode<OrgData>[] => {
      if (!includeUsers) return []; // 옵션이 꺼져있으면 빈 배열 반환

      return USERS.filter(
        (u) =>
          u.department_id === deptId &&
          (u.name.includes(searchTerm) || u.login_id.includes(searchTerm)),
      ).map((user) => ({
        id: user.id,
        label: user.name,
        icon: UserCircle,
        subInfo: [user.login_id],
        data: user,
      }));
    };

    // [Main Logic] 본부 -> 센터 -> 부서 -> (사용자) 순회
    return SECTORS.map((sector): TreeNode<OrgData> | null => {
      // 1. 직영 부서 처리
      const directDeptNodes: TreeNode<OrgData>[] = DEPARTMENTS.filter(
        (d) =>
          d.sector_id === sector.id &&
          !d.center_id &&
          // 사용자 모드가 아닐 땐 부서명으로 검색, 사용자 모드일 땐 검색 로직이 아래 userNodes에 의존
          (!includeUsers
            ? d.name.includes(searchTerm) || d.code?.includes(searchTerm)
            : true),
      )
        .map((dept): TreeNode<OrgData> | null => {
          const userNodes = mapUsers(dept.id);

          // 사용자 모드인데 검색어가 있고, 매칭된 사용자가 없으면 부서 숨김
          if (includeUsers && searchTerm && userNodes.length === 0) return null;

          // 부서 모드인데 검색어가 있고, 부서명이 매칭 안되면 숨김 (위 필터에서 이미 걸러짐)

          return {
            id: `dept-${dept.id}`,
            label: dept.name,
            icon: Building2,
            children: userNodes, // 사용자 모드면 채워지고, 아니면 빈 배열
            data: dept,
          };
        })
        .filter((node): node is TreeNode<OrgData> => node !== null);

      // 2. 센터 및 산하 부서 처리
      const centerNodes: TreeNode<OrgData>[] = CENTERS.filter(
        (c) => c.sector_id === sector.id,
      )
        .map((center): TreeNode<OrgData> | null => {
          const centerDeptNodes: TreeNode<OrgData>[] = DEPARTMENTS.filter(
            (d) =>
              d.center_id === center.id &&
              (!includeUsers
                ? d.name.includes(searchTerm) || d.code?.includes(searchTerm)
                : true),
          )
            .map((dept): TreeNode<OrgData> | null => {
              const userNodes = mapUsers(dept.id);

              if (includeUsers && searchTerm && userNodes.length === 0)
                return null;

              return {
                id: `dept-${dept.id}`,
                label: dept.name,
                icon: Building2,
                children: userNodes,
                data: dept,
              };
            })
            .filter((node): node is TreeNode<OrgData> => node !== null);

          // 하위 부서가 없으면 센터 숨김
          if ((includeUsers || searchTerm) && centerDeptNodes.length === 0)
            return null;

          return {
            id: `center-${center.id}`,
            label: center.name,
            icon: MapPin,
            children: centerDeptNodes,
            data: center,
          };
        })
        .filter((node): node is TreeNode<OrgData> => node !== null);

      // 하위 요소가 없으면 본부 숨김
      if (
        (includeUsers || searchTerm) &&
        directDeptNodes.length === 0 &&
        centerNodes.length === 0
      ) {
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
  }, [searchTerm, includeUsers]);
}
