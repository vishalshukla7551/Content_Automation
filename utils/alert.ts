import Swal from "sweetalert2";

/**
 * Shows a success alert
 * @param {string} title - Alert title
 * @param {string} text - Alert message
 */
export const showSuccessAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#6366F1",
  });
};

/**
 * Shows an error alert
 * @param {string} title - Alert title
 * @param {string} text - Alert message
 */
export const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#EF4444",
  });
};

/**
 * Shows a confirmation dialog
 * @param {string} title - Confirmation title
 * @param {string} text - Confirmation message
 * @returns {Promise<boolean>} - Resolves true if confirmed, false if canceled
 */
export const showConfirmAlert = (title: string, text: string): Promise<boolean> => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6366F1",
    cancelButtonColor: "#EF4444",
    confirmButtonText: "Yes, proceed!",
  }).then((result) => result.isConfirmed);
};