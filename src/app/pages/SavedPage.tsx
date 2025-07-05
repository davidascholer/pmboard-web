import React, { useEffect, useState } from "react";

import PageContainer from "../components/PageContainer";
import { getDetailsFromIDs } from "../api/controller/dynamic/apiDynamic";
import { useAppSelector } from "@/state/hooks";
import { SignInMessage } from "../components/SignInMessage";
import { ApiListItemType } from "../api/controller/static/types";
import { QueryListItem } from "./QueryList";

const SavedPage: React.FC = () => {
  const [filteredApiList, setFilteredApiList] = useState<
    ApiListItemType[] | undefined
  >(undefined);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    // Format the data to match the expected type
    const formatData = async () => {
      const listFromData = await getDetailsFromIDs(user.saved_items);
      if (listFromData) {
        setFilteredApiList(listFromData);
      } else {
        setFilteredApiList([]);
      }
    };
    formatData();
  }, [user.saved_items]);

  if (!user.signedIn) {
    return (
      <PageContainer isLoading={filteredApiList === undefined}>
        <SignInMessage />
      </PageContainer>
    );
  }
  return (
    <PageContainer isLoading={filteredApiList === undefined}>
      {filteredApiList !== undefined && filteredApiList.length > 0 ? (
        <div
          id="query-list-container"
          className="flex justify-evenly flex-wrap w-full gap-4"
        >
          {filteredApiList?.map((item: ApiListItemType, key: number) => (
            <QueryListItem key={key} item={item} />
          ))}
        </div>
      ) : (
        <p>You don't have any saved items.</p>
      )}
    </PageContainer>
  );
};

export default SavedPage;
