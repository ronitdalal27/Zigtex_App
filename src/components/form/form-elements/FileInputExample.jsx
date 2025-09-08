import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";

export default function FileInputExample() {
  const [selectedFileName, setSelectedFileName] = useState(null); // removed <string | null>

  const handleFileChange = (event) => { // removed : React.ChangeEvent<HTMLInputElement>
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  return (
    <ComponentCard title="File Input">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload file</Label>
        <FileInput
          id="file-upload"
          onChange={handleFileChange}
          className="custom-class"
        />
        {selectedFileName && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selected: <span className="font-medium">{selectedFileName}</span>
          </p>
        )}
      </div>
    </ComponentCard>
  );
}
