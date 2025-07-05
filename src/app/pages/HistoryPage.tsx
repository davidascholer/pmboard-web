import React, { useEffect, useState } from "react";

import PageContainer from "../components/PageContainer";
import { ApiListItemType } from "../api/controller/static/types";
import { getDetailsFromIDs } from "../api/controller/dynamic/apiDynamic";
import { QueryListItem } from "./QueryList";

const HistoryPage: React.FC = () => {
  const [filteredApiList, setFilteredApiList] = useState<
    ApiListItemType[] | undefined
  >(undefined);

  useEffect(() => {
    // Format the data to match the expected type
    const formatData = async () => {
      // Get the list of items from the local storage
      const savedApiList = localStorage.getItem("savedApiList");
      const items = savedApiList ? JSON.parse(savedApiList) : [];
      // If the list is empty, return
      if (items.length === 0) return;
      const listFromData = await getDetailsFromIDs(items);
      if (listFromData) {
        setFilteredApiList(listFromData);
      } else {
        setFilteredApiList([]);
      }
    };
    formatData();
  }, []);

  return (
    <PageContainer>
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
        <p>You haven't visited any items yet.</p>
      )}
    </PageContainer>
  );
};

export default HistoryPage;
