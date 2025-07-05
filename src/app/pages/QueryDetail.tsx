import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import PageContainer from "../components/PageContainer";
import { formatExternalDataToDetail } from "../api/controller/dynamic/apiDynamic";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";
import StarButton from "../components/StarButton";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { verifyUserSession } from "../api/util/util";
import { setUserSavedItems } from "../api/controller/userApi";
import { UserProfileType } from "@/shared/types";
import { setStateSavedItems } from "@/state/services/userSlice";
import { useGetListDetailQuery } from "@/state/services/apiSlice";
import { PRIMARY_RESOURCE_TYPE } from "../api/controller/dynamic/constants";
import { ApiDetailType, DescriptionType } from "../api/controller/static/types";

const QueryDetail: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [apiDetail, setApiDetail] = useState<ApiDetailType | undefined>(
    undefined
  );
  const { id } = useParams();
  const apiUrl = `/${PRIMARY_RESOURCE_TYPE}/${id}`;
  const { data, error, isLoading } = useGetListDetailQuery(apiUrl);

  useEffect(() => {
    // Add apiId string to an array saved to local storage
    const savedApiList = localStorage.getItem("savedApiList");
    const savedApiListArray = savedApiList ? JSON.parse(savedApiList) : [];
    // If the name exists in the array, remove it
    if (savedApiListArray.includes(id)) {
      savedApiListArray.splice(savedApiListArray.indexOf(id), 1);
    }
    // Add the name to the beginning of the array
    savedApiListArray.unshift(id);
    // Limit the array to 20 items
    if (savedApiListArray.length > 20) {
      savedApiListArray.pop();
    }
    // Save the array to local storage
    localStorage.setItem("savedApiList", JSON.stringify(savedApiListArray));
  }, [id]);

  useEffect(() => {
    if (!data) return;
    // Format the data to match the expected type
    const formatData = async () => {
      // Use this if the API doesn't include the image URL
      const formattedData = await formatExternalDataToDetail(data);
      // Use this if the API includes the image URL
      // const formattedData = formatExternalDataToList(data);
      setApiDetail(formattedData);
    };
    formatData();
  }, [data]);

  const handleToggleSavedItemClicked = async () => {
    const authTokenResponse = await verifyUserSession();
    if (!authTokenResponse.ok) {
      console.error("User must be logged in to add edit settings");
    }

    const authToken = (authTokenResponse as { authToken: string }).authToken;
    if (!authToken) {
      console.error("No auth token found");
      return;
    }

    const savedItems = [...user.saved_items];
    if (savedItems.includes(Number(id))) {
      savedItems.splice(savedItems.indexOf(Number(id)), 1);
    } else {
      savedItems.push(Number(id));
    }

    const response = await setUserSavedItems({
      authToken: authToken,
      saved_items: savedItems,
    });

    const data = response.data as {
      saved_items: UserProfileType["saved_items"];
    };
    const updatedSavedItems = data.saved_items;
    dispatch(setStateSavedItems(updatedSavedItems));
  };

  if (error) {
    return (
      <PageContainer>
        <div className="flex justify-center">
          <div className="text-lg">
            There was a problem loading the data. Please check your internet
            connection and try again.
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!apiDetail) {
    return (
      <PageContainer isLoading={true}>
        <div className="flex justify-center"></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      disableAutoLoading
      toolbar={<AppToolbar back />}
      isLoading={isLoading}
    >
      <div
        id="query-list-container"
        className="flex flex-col w-full justify-center items-center gap-4"
      >
        <h1 className="text-xl font-bold">{apiDetail.title}</h1>
        {apiDetail.imageUrl ? (
          <img
            src={apiDetail.imageUrl}
            alt={apiDetail.title}
            className="object-cover w-full p-10%"
          />
        ) : null}
        <div className="flex flex-col justify-start gap-4 justify-self-start w-full">
          {apiDetail.descriptionItems.map(
            (item: DescriptionType, index: number) => (
              <div key={index} className="flex flex-row justify-start gap-2 justify-self-start w-full">
                <p className="text-sm font-medium">
                  {item.title}:
                </p>
                <p className="text-sm font-light">
                  {item.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      {user.signedIn ? (
        <div className="w-full text-center">
          <StarButton
            className="mt-8"
            isFilled={user.saved_items.includes(Number(id))}
            onClick={handleToggleSavedItemClicked}
          />
        </div>
      ) : null}
    </PageContainer>
  );
};

export default QueryDetail;
