export function errorTreats(error) {
  if (error.code === "ENOENT") {
    throw new Error("File not found");
  } else {
    return "Error on application";
  }
}
