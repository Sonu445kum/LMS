import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const LectureTab = () => {
  return (
    <Card>
      <CardHeader className="flex items-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Here you can edit the lecture details.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
        <Button variant="destructive">
          Remove Lecture
        </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LectureTab;
