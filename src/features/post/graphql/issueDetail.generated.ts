
import {
  useQuery,
  useInfiniteQuery,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { fetcher } from "@/libs/fetcher";

import * as Types from "../../../generated/types.generated";
export type IssueDetailQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type IssueDetailQuery = {
  __typename?: "Query";
  node?:
    | { __typename?: "AddedToProjectEvent" }
    | { __typename?: "App" }
    | { __typename?: "AssignedEvent" }
    | { __typename?: "AutoMergeDisabledEvent" }
    | { __typename?: "AutoMergeEnabledEvent" }
    | { __typename?: "AutoRebaseEnabledEvent" }
    | { __typename?: "AutoSquashEnabledEvent" }
    | { __typename?: "AutomaticBaseChangeFailedEvent" }
    | { __typename?: "AutomaticBaseChangeSucceededEvent" }
    | { __typename?: "BaseRefChangedEvent" }
    | { __typename?: "BaseRefDeletedEvent" }
    | { __typename?: "BaseRefForcePushedEvent" }
    | { __typename?: "Blob" }
    | { __typename?: "Bot" }
    | { __typename?: "BranchProtectionRule" }
    | { __typename?: "BypassForcePushAllowance" }
    | { __typename?: "BypassPullRequestAllowance" }
    | { __typename?: "CWE" }
    | { __typename?: "CheckRun" }
    | { __typename?: "CheckSuite" }
    | { __typename?: "ClosedEvent" }
    | { __typename?: "CodeOfConduct" }
    | { __typename?: "CommentDeletedEvent" }
    | { __typename?: "Commit" }
    | { __typename?: "CommitComment" }
    | { __typename?: "CommitCommentThread" }
    | { __typename?: "Comparison" }
    | { __typename?: "ConnectedEvent" }
    | { __typename?: "ConvertToDraftEvent" }
    | { __typename?: "ConvertedNoteToIssueEvent" }
    | { __typename?: "ConvertedToDiscussionEvent" }
    | { __typename?: "CrossReferencedEvent" }
    | { __typename?: "DemilestonedEvent" }
    | { __typename?: "DeployKey" }
    | { __typename?: "DeployedEvent" }
    | { __typename?: "Deployment" }
    | { __typename?: "DeploymentEnvironmentChangedEvent" }
    | { __typename?: "DeploymentReview" }
    | { __typename?: "DeploymentStatus" }
    | { __typename?: "DisconnectedEvent" }
    | { __typename?: "Discussion" }
    | { __typename?: "DiscussionCategory" }
    | { __typename?: "DiscussionComment" }
    | { __typename?: "DiscussionPoll" }
    | { __typename?: "DiscussionPollOption" }
    | { __typename?: "DraftIssue" }
    | { __typename?: "Enterprise" }
    | { __typename?: "EnterpriseAdministratorInvitation" }
    | { __typename?: "EnterpriseIdentityProvider" }
    | { __typename?: "EnterpriseRepositoryInfo" }
    | { __typename?: "EnterpriseServerInstallation" }
    | { __typename?: "EnterpriseServerUserAccount" }
    | { __typename?: "EnterpriseServerUserAccountEmail" }
    | { __typename?: "EnterpriseServerUserAccountsUpload" }
    | { __typename?: "EnterpriseUserAccount" }
    | { __typename?: "Environment" }
    | { __typename?: "ExternalIdentity" }
    | { __typename?: "Gist" }
    | { __typename?: "GistComment" }
    | { __typename?: "HeadRefDeletedEvent" }
    | { __typename?: "HeadRefForcePushedEvent" }
    | { __typename?: "HeadRefRestoredEvent" }
    | { __typename?: "IpAllowListEntry" }
    | {
        __typename?: "Issue";
        id: string;
        title: string;
        body: string;
        bodyHTML: any;
        updatedAt: any;
        closed: boolean;
        labels?: {
          __typename?: "LabelConnection";
          nodes?: Array<{
            __typename?: "Label";
            color: string;
            id: string;
            name: string;
          } | null> | null;
        } | null;
        projectItems: {
          __typename?: "ProjectV2ItemConnection";
          totalCount: number;
          nodes?: Array<{
            __typename?: "ProjectV2Item";
            fieldValueByName?:
              | { __typename?: "ProjectV2ItemFieldDateValue" }
              | { __typename?: "ProjectV2ItemFieldIterationValue" }
              | { __typename?: "ProjectV2ItemFieldLabelValue" }
              | { __typename?: "ProjectV2ItemFieldMilestoneValue" }
              | { __typename?: "ProjectV2ItemFieldNumberValue" }
              | { __typename?: "ProjectV2ItemFieldPullRequestValue" }
              | { __typename?: "ProjectV2ItemFieldRepositoryValue" }
              | { __typename?: "ProjectV2ItemFieldReviewerValue" }
              | {
                  __typename?: "ProjectV2ItemFieldSingleSelectValue";
                  id: string;
                  name?: string | null;
                }
              | { __typename?: "ProjectV2ItemFieldTextValue" }
              | { __typename?: "ProjectV2ItemFieldUserValue" }
              | null;
          } | null> | null;
        };
        comments: {
          __typename?: "IssueCommentConnection";
          nodes?: Array<{ __typename?: "IssueComment"; body: string } | null> | null;
        };
      }
    | { __typename?: "IssueComment" }
    | { __typename?: "Label" }
    | { __typename?: "LabeledEvent" }
    | { __typename?: "Language" }
    | { __typename?: "License" }
    | { __typename?: "LinkedBranch" }
    | { __typename?: "LockedEvent" }
    | { __typename?: "Mannequin" }
    | { __typename?: "MarkedAsDuplicateEvent" }
    | { __typename?: "MarketplaceCategory" }
    | { __typename?: "MarketplaceListing" }
    | { __typename?: "MembersCanDeleteReposClearAuditEntry" }
    | { __typename?: "MembersCanDeleteReposDisableAuditEntry" }
    | { __typename?: "MembersCanDeleteReposEnableAuditEntry" }
    | { __typename?: "MentionedEvent" }
    | { __typename?: "MergedEvent" }
    | { __typename?: "MigrationSource" }
    | { __typename?: "Milestone" }
    | { __typename?: "MilestonedEvent" }
    | { __typename?: "MovedColumnsInProjectEvent" }
    | { __typename?: "OIDCProvider" }
    | { __typename?: "OauthApplicationCreateAuditEntry" }
    | { __typename?: "OrgAddBillingManagerAuditEntry" }
    | { __typename?: "OrgAddMemberAuditEntry" }
    | { __typename?: "OrgBlockUserAuditEntry" }
    | { __typename?: "OrgConfigDisableCollaboratorsOnlyAuditEntry" }
    | { __typename?: "OrgConfigEnableCollaboratorsOnlyAuditEntry" }
    | { __typename?: "OrgCreateAuditEntry" }
    | { __typename?: "OrgDisableOauthAppRestrictionsAuditEntry" }
    | { __typename?: "OrgDisableSamlAuditEntry" }
    | { __typename?: "OrgDisableTwoFactorRequirementAuditEntry" }
    | { __typename?: "OrgEnableOauthAppRestrictionsAuditEntry" }
    | { __typename?: "OrgEnableSamlAuditEntry" }
    | { __typename?: "OrgEnableTwoFactorRequirementAuditEntry" }
    | { __typename?: "OrgInviteMemberAuditEntry" }
    | { __typename?: "OrgInviteToBusinessAuditEntry" }
    | { __typename?: "OrgOauthAppAccessApprovedAuditEntry" }
    | { __typename?: "OrgOauthAppAccessDeniedAuditEntry" }
    | { __typename?: "OrgOauthAppAccessRequestedAuditEntry" }
    | { __typename?: "OrgRemoveBillingManagerAuditEntry" }
    | { __typename?: "OrgRemoveMemberAuditEntry" }
    | { __typename?: "OrgRemoveOutsideCollaboratorAuditEntry" }
    | { __typename?: "OrgRestoreMemberAuditEntry" }
    | { __typename?: "OrgUnblockUserAuditEntry" }
    | { __typename?: "OrgUpdateDefaultRepositoryPermissionAuditEntry" }
    | { __typename?: "OrgUpdateMemberAuditEntry" }
    | { __typename?: "OrgUpdateMemberRepositoryCreationPermissionAuditEntry" }
    | { __typename?: "OrgUpdateMemberRepositoryInvitationPermissionAuditEntry" }
    | { __typename?: "Organization" }
    | { __typename?: "OrganizationIdentityProvider" }
    | { __typename?: "OrganizationInvitation" }
    | { __typename?: "Package" }
    | { __typename?: "PackageFile" }
    | { __typename?: "PackageTag" }
    | { __typename?: "PackageVersion" }
    | { __typename?: "PinnedDiscussion" }
    | { __typename?: "PinnedEvent" }
    | { __typename?: "PinnedIssue" }
    | { __typename?: "PrivateRepositoryForkingDisableAuditEntry" }
    | { __typename?: "PrivateRepositoryForkingEnableAuditEntry" }
    | { __typename?: "Project" }
    | { __typename?: "ProjectCard" }
    | { __typename?: "ProjectColumn" }
    | { __typename?: "ProjectNext" }
    | { __typename?: "ProjectNextField" }
    | { __typename?: "ProjectNextItem" }
    | { __typename?: "ProjectNextItemFieldValue" }
    | { __typename?: "ProjectV2" }
    | { __typename?: "ProjectV2Field" }
    | { __typename?: "ProjectV2Item" }
    | { __typename?: "ProjectV2ItemFieldDateValue" }
    | { __typename?: "ProjectV2ItemFieldIterationValue" }
    | { __typename?: "ProjectV2ItemFieldNumberValue" }
    | { __typename?: "ProjectV2ItemFieldSingleSelectValue" }
    | { __typename?: "ProjectV2ItemFieldTextValue" }
    | { __typename?: "ProjectV2IterationField" }
    | { __typename?: "ProjectV2SingleSelectField" }
    | { __typename?: "ProjectV2View" }
    | { __typename?: "ProjectView" }
    | { __typename?: "PublicKey" }
    | { __typename?: "PullRequest" }
    | { __typename?: "PullRequestCommit" }
    | { __typename?: "PullRequestCommitCommentThread" }
    | { __typename?: "PullRequestReview" }
    | { __typename?: "PullRequestReviewComment" }
    | { __typename?: "PullRequestReviewThread" }
    | { __typename?: "PullRequestThread" }
    | { __typename?: "Push" }
    | { __typename?: "PushAllowance" }
    | { __typename?: "Reaction" }
    | { __typename?: "ReadyForReviewEvent" }
    | { __typename?: "Ref" }
    | { __typename?: "ReferencedEvent" }
    | { __typename?: "Release" }
    | { __typename?: "ReleaseAsset" }
    | { __typename?: "RemovedFromProjectEvent" }
    | { __typename?: "RenamedTitleEvent" }
    | { __typename?: "ReopenedEvent" }
    | { __typename?: "RepoAccessAuditEntry" }
    | { __typename?: "RepoAddMemberAuditEntry" }
    | { __typename?: "RepoAddTopicAuditEntry" }
    | { __typename?: "RepoArchivedAuditEntry" }
    | { __typename?: "RepoChangeMergeSettingAuditEntry" }
    | { __typename?: "RepoConfigDisableAnonymousGitAccessAuditEntry" }
    | { __typename?: "RepoConfigDisableCollaboratorsOnlyAuditEntry" }
    | { __typename?: "RepoConfigDisableContributorsOnlyAuditEntry" }
    | { __typename?: "RepoConfigDisableSockpuppetDisallowedAuditEntry" }
    | { __typename?: "RepoConfigEnableAnonymousGitAccessAuditEntry" }
    | { __typename?: "RepoConfigEnableCollaboratorsOnlyAuditEntry" }
    | { __typename?: "RepoConfigEnableContributorsOnlyAuditEntry" }
    | { __typename?: "RepoConfigEnableSockpuppetDisallowedAuditEntry" }
    | { __typename?: "RepoConfigLockAnonymousGitAccessAuditEntry" }
    | { __typename?: "RepoConfigUnlockAnonymousGitAccessAuditEntry" }
    | { __typename?: "RepoCreateAuditEntry" }
    | { __typename?: "RepoDestroyAuditEntry" }
    | { __typename?: "RepoRemoveMemberAuditEntry" }
    | { __typename?: "RepoRemoveTopicAuditEntry" }
    | { __typename?: "Repository" }
    | { __typename?: "RepositoryInvitation" }
    | { __typename?: "RepositoryMigration" }
    | { __typename?: "RepositoryTopic" }
    | { __typename?: "RepositoryVisibilityChangeDisableAuditEntry" }
    | { __typename?: "RepositoryVisibilityChangeEnableAuditEntry" }
    | { __typename?: "RepositoryVulnerabilityAlert" }
    | { __typename?: "ReviewDismissalAllowance" }
    | { __typename?: "ReviewDismissedEvent" }
    | { __typename?: "ReviewRequest" }
    | { __typename?: "ReviewRequestRemovedEvent" }
    | { __typename?: "ReviewRequestedEvent" }
    | { __typename?: "SavedReply" }
    | { __typename?: "SecurityAdvisory" }
    | { __typename?: "SponsorsActivity" }
    | { __typename?: "SponsorsListing" }
    | { __typename?: "SponsorsTier" }
    | { __typename?: "Sponsorship" }
    | { __typename?: "SponsorshipNewsletter" }
    | { __typename?: "Status" }
    | { __typename?: "StatusCheckRollup" }
    | { __typename?: "StatusContext" }
    | { __typename?: "SubscribedEvent" }
    | { __typename?: "Tag" }
    | { __typename?: "Team" }
    | { __typename?: "TeamAddMemberAuditEntry" }
    | { __typename?: "TeamAddRepositoryAuditEntry" }
    | { __typename?: "TeamChangeParentTeamAuditEntry" }
    | { __typename?: "TeamDiscussion" }
    | { __typename?: "TeamDiscussionComment" }
    | { __typename?: "TeamRemoveMemberAuditEntry" }
    | { __typename?: "TeamRemoveRepositoryAuditEntry" }
    | { __typename?: "Topic" }
    | { __typename?: "TransferredEvent" }
    | { __typename?: "Tree" }
    | { __typename?: "UnassignedEvent" }
    | { __typename?: "UnlabeledEvent" }
    | { __typename?: "UnlockedEvent" }
    | { __typename?: "UnmarkedAsDuplicateEvent" }
    | { __typename?: "UnpinnedEvent" }
    | { __typename?: "UnsubscribedEvent" }
    | { __typename?: "User" }
    | { __typename?: "UserBlockedEvent" }
    | { __typename?: "UserContentEdit" }
    | { __typename?: "UserStatus" }
    | { __typename?: "VerifiableDomain" }
    | { __typename?: "Workflow" }
    | { __typename?: "WorkflowRun" }
    | null;
};

export const IssueDetailDocument = `
    query IssueDetail($id: ID!) {
  node(id: $id) {
    ... on Issue {
      id
      title
      body
      bodyHTML
      labels(first: 5) {
        nodes {
          color
          id
          name
        }
      }
      updatedAt
      closed
      projectItems(first: 1) {
        totalCount
        nodes {
          fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue {
              id
              name
            }
          }
        }
      }
      comments(first: 1) {
        nodes {
          body
        }
      }
    }
  }
}
    `;
export const useIssueDetailQuery = <TData = IssueDetailQuery, TError = unknown>(
  variables: IssueDetailQueryVariables,
  options?: UseQueryOptions<IssueDetailQuery, TError, TData>,
) =>
  useQuery<IssueDetailQuery, TError, TData>(
    ["IssueDetail", variables],
    fetcher<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, variables),
    options,
  );

useIssueDetailQuery.getKey = (variables: IssueDetailQueryVariables) => ["IssueDetail", variables];
export const useInfiniteIssueDetailQuery = <TData = IssueDetailQuery, TError = unknown>(
  pageParamKey: keyof IssueDetailQueryVariables,
  variables: IssueDetailQueryVariables,
  options?: UseInfiniteQueryOptions<IssueDetailQuery, TError, TData>,
) => {
  return useInfiniteQuery<IssueDetailQuery, TError, TData>(
    ["IssueDetail.infinite", variables],
    (metaData) =>
      fetcher<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, {
        ...variables,
        [pageParamKey]: metaData.pageParam,
      })(),
    options,
  );
};

useInfiniteIssueDetailQuery.getKey = (variables: IssueDetailQueryVariables) => [
  "IssueDetail.infinite",
  variables,
];
useIssueDetailQuery.fetcher = (
  variables: IssueDetailQueryVariables,
  options?: RequestInit["headers"],
) => fetcher<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, variables, options);
