"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Landmark, Trash2 } from "lucide-react";
import { useTransition } from "react";
const PresetActions = ({
  id,
  dialogTitle,
  dialogMessage,
  PressActionButton,
  HandleActionPerform,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  let [isPending, startTransition] = useTransition();
  return (
    <div className="flex-1">
      <Button onClick={() => setShowDeleteDialog(true)} variant="destructive">
        {/* <Trash2 /> */}
        <span className=""> {dialogTitle}</span>
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              `This action cannot be undone. {dialogMessage}`
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() =>
                startTransition(() => {
                  HandleActionPerform(id), setShowDeleteDialog(false);
                })
              }
            >
              {isPending === true ? "processing " : PressActionButton}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PresetActions;
