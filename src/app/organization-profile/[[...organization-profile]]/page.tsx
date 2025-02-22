"use client";

import { OrganizationList, OrganizationProfile } from "@clerk/nextjs";
import { Building2Icon } from "lucide-react";

const OrganizationProfilePage = () => (
  <div className="flex h-screen items-center justify-center">
    <OrganizationProfile path="/organization-profile" routing="path">
      <OrganizationProfile.Page
        label="Organizations list"
        labelIcon={<Building2Icon className="size-4" />}
        url="org-list"
      >
        <div className="flex h-full w-full items-center justify-center">
          <OrganizationList
            afterSelectOrganizationUrl={() => "/"}
            afterCreateOrganizationUrl={() => "/"}
            hidePersonal
          />
        </div>
      </OrganizationProfile.Page>
    </OrganizationProfile>
  </div>
);

export default OrganizationProfilePage;
