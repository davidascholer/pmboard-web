/* Types */
export type ExternalResourceType = "pokemon";
// "objects" resource type
export type ExternalApiListResponseType = {
  count: number;
  results: {
    name: string;
    url: string;
  }[]
};

// External detail types
export type ExternalApiDetailAbilityType = { ability: { name: string } };

export type ExternalApiDetailFormsType = { name: string; url: string };

export type ExternalApiDetailSpeciesType = { name: string; url: string };

export type ExternalApiDetailType = {
  id: number;
  name: string;
  sprites?: { front_default?: string };
  abilities?: ExternalApiDetailAbilityType[];
  base_experience?: number;
  forms?: ExternalApiDetailFormsType[];
  species?: ExternalApiDetailSpeciesType;
  height?: number;
  weight?: number;
  order?: number;
};
