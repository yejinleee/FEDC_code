import styled from "@emotion/styled";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { Task } from "./Task";

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    &:not(:first-of-type) {
      margin-top: 8px;
    }
  }
`;
const GET_TASKS = gql`
  query GetTasks {
    tasks {
      data {
        id
        attributes {
          content
          complete
        }
      }
    }
  }
`;

export const TaskList = () => {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return "Loading...";
  if (error) return "ERROR!";
  return (
    <UnorderedList>
      {data.tasks.data.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            content={task.attributes.content}
            complete={task.attributes.complete}
          />
        );
      })}
    </UnorderedList>
  );
};
