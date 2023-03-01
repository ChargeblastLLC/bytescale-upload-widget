import { Upload, UploadInterface, UploadConfig } from "upload-js";
import { UploadWidgetConfig, UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { render } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploadWidgetContainer, UploaderRootProps } from "uploader/components/widgets/uploader/UploadWidgetContainer";
import { RootModal } from "uploader/components/modal/RootModal";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
import { UploaderInterface } from "uploader/UploaderInterface";

export function Uploader(uploadOrConfig: UploadConfig | UploadInterface): UploaderInterface {
  // ----------------
  // READONLY MEMBERS
  // ----------------

  let uploadMaybe: UploadInstanceMaybe;

  // ----------------
  // CONSTRUCTOR
  // ----------------

  if (UploadInstanceMaybe.isUploadInstance(uploadOrConfig)) {
    uploadMaybe = { type: "upload", value: uploadOrConfig };
  } else {
    try {
      uploadMaybe = { type: "upload", value: Upload(uploadOrConfig) };
    } catch (e) {
      uploadMaybe = { type: "error", value: e as Error };
    }
  }

  // ----------------
  // PUBLIC METHODS
  // ----------------

  const open = async (optionsMaybe: UploadWidgetConfig = {}): Promise<UploadWidgetResult[]> => {
    const options = UploadWidgetConfigRequired.from(optionsMaybe);

    // Important: wait for body first, before using 'querySelector' below.
    const body = await getBody();

    const container =
      options.container !== undefined
        ? typeof options.container === "string"
          ? document.querySelector(options.container) ?? undefined
          : options.container
        : undefined;

    const widget = document.createElement("div");
    (container ?? body).appendChild(widget);

    widget.className = `uploader${options.layout === "modal" ? " uploader--with-modal" : ""}`;
    widget.setAttribute(
      "style",
      [
        `--error-color: ${options.styles.colors.error};`,
        `--primary-color: ${options.styles.colors.primary};`,
        `--primary-active-color: ${options.styles.colors.active};`,
        `--shade-min: ${options.styles.colors.shadeMin};`,
        `--shade-max: ${options.styles.colors.shadeMax};`,
        `--shade-100: ${options.styles.colors.shade100};`,
        `--shade-200: ${options.styles.colors.shade200};`,
        `--shade-300: ${options.styles.colors.shade300};`,
        `--shade-400: ${options.styles.colors.shade400};`,
        `--shade-500: ${options.styles.colors.shade500};`,
        `--shade-700: ${options.styles.colors.shade700};`,
        `--shade-900: ${options.styles.colors.shade900};`,
        `font-size: ${options.styles.fontSizes.base}px;`
      ].join(" ")
    );

    const uploadedFiles = await new Promise<UploadWidgetResult[]>((resolve, reject) => {
      const props: UploaderRootProps = {
        upload: uploadMaybe,
        resolve,
        reject,
        options
      };

      render(
        options.layout === "modal" ? <RootModal {...props} container={widget} /> : <UploadWidgetContainer {...props} />,
        widget
      );
    });

    if (options.layout === "modal") {
      widget.remove();
    }

    return uploadedFiles;
  };

  // ----------------
  // PRIVATE METHODS
  // ----------------

  /**
   * Required when the 'uploader.open()' method is called from within '<head>'.
   */
  const getBody = async (): Promise<HTMLElement> => {
    return await new Promise(resolve => {
      const attempt = (): void => {
        const bodyMaybe = document.body ?? undefined;
        if (bodyMaybe !== undefined) {
          resolve(bodyMaybe);
        }
        setTimeout(attempt, 100);
      };

      attempt();
    });
  };

  // If this isn't a valid upload instance, then the user will experience errors when attempting to use it as one, but
  // they'll also be aware there's a problem as we'll render one on screen.
  const upload: UploadInterface = uploadMaybe.type === "upload" ? uploadMaybe.value : ({} as any);

  return {
    ...upload,
    open
  };
}
