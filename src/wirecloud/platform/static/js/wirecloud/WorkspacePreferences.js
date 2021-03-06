/*
 *     Copyright (c) 2008-2016 CoNWeT Lab., Universidad Politécnica de Madrid
 *     Copyright (c) 2020 Future Internet Consulting and Development Solutions S.L.
 *
 *     This file is part of Wirecloud Platform.
 *
 *     Wirecloud Platform is free software: you can redistribute it and/or
 *     modify it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     Wirecloud is distributed in the hope that it will be useful, but WITHOUT
 *     ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *     FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 *     License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with Wirecloud Platform.  If not, see
 *     <http://www.gnu.org/licenses/>.
 *
 */

/* globals Wirecloud */


(function (ns, utils) {

    "use strict";

    ns.WorkspacePreferences = class WorkspacePreferences extends ns.Preferences {

        constructor(definitions, workspace, values) {
            super(definitions, values);
            this._workspace = workspace;

            Wirecloud.preferences.addEventListener('post-commit', this._handleParentChanges);
        }

        buildTitle() {
            return utils.gettext("Settings");
        }

        getParentValue(name) {
            return Wirecloud.preferences.get(name);
        }

        _build_save_url() {
            return Wirecloud.URLs.WORKSPACE_PREFERENCES.evaluate({workspace_id: this._workspace.id});
        }

        destroy() {
            Wirecloud.preferences.removeEventListener('post-commit', this._handleParentChanges);

            super.destroy();
            this._workspace = null;
        }

    }

})(Wirecloud, Wirecloud.Utils);
